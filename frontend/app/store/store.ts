import { create } from 'zustand';
import { getCartFromDB } from '@/lib/cart';
import { addProductToCart, getLocalCart, isSameCart, mergeCarts, setLocalAndDbCart } from '@/utils/cartStorage';

interface VinaTeaState {
    cart: Cart | null;
    isLoading: boolean;
    isAdding: boolean;
    setCart: () => Promise<void>;
    addToStore: (products: ProductInCart[]) => void;
    getQuantityByProductId: (productId: string) => number;
    user: NextAuthUser | null;
    setUser: (user: NextAuthUser | null) => void;
    clearStore: () => void;
}

export const useVinaTeaStore = create<VinaTeaState>((set, get) => ({
    cart: null,
    isLoading: true,
    isAdding: true,
    setCart: async () => {
        set({ isLoading: true });
        const user = get().user;
        const localCart = getLocalCart();
        // If there is a user, check if there is a cart in the database
        if (user) {
            try {
                const dbCart = await getCartFromDB(user.accessToken);
                // If there is a cart in the database, merge with local cart
                if (dbCart && dbCart.products.length > 0 && !isSameCart(localCart, dbCart)) {
                    const updatedCart = await mergeCarts(localCart, dbCart, user, get().isAdding);
                    set({ cart: updatedCart, isLoading: false });
                    console.log("USER IS LOGGED IN", "THERE IS DB CART && NOT SAME AS LOCAL CART", get().cart);
                } else {
                    // If no cart in database, return local cart
                    set({ cart: localCart, isLoading: false });
                    // Update database and localStorage carts
                    if (localCart && localCart.products.length > 0) {
                        await setLocalAndDbCart(localCart, user);
                    }

                    console.log("USER IS LOGGED IN", "THERE IS NO DB CART OR CARTS ARE THE SAME", get().cart);
                }
            } catch (err) {
                // Fall back to local cart if error
                set({ cart: localCart, isLoading: false });
            }
        } else {
            set({ cart: localCart, isLoading: false });
            console.log("USER IS NOT LOGGED IN", get().cart);
        }
    },
    addToStore: (products) => {
        set({ isLoading: true });
        // ADD TO LOCAL STORAGE
        products.forEach((prod) => {
            if (prod.quantity < 0) set({ isAdding: false })
            else set({ isAdding: true })
            addProductToCart(prod);
        })
    },
    getQuantityByProductId: (productId) => {
        const cart = get().cart;
        if (!cart) return 0;
        const index = cart.products.findIndex((prod) => prod.productId === productId);
        if (index === -1) return 0;
        return cart.products[index].quantity;
    },
    user: null,
    setUser: (user) => set({ user }),
    clearStore: () => set({ user: null, cart: null, isLoading: true, isAdding: true }),
}));
