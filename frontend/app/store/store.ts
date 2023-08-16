import { create } from 'zustand';
import { clearDBCart, getCartFromDB, removeProductFromDB, updateDBCart } from '@/lib/cart';
import { addProductToCart, clearLocalCart, getLocalCart, setLocalCart } from '@/utils/cartStorage';
import { calculateCartCount, calculateCartTotal } from '../helpers/cart';

interface GrocerState {
    cart: Cart | null;
    isLoading: boolean;
    setCart: () => Promise<void>;
    addToStore: (products: ProductInCart[]) => void;
    getQuantityByProductId: (productId: string) => number;
    user: User | null;
    setUser: (user: User | null) => void;
}

function isSameCart(localCart: Cart | null, dbCart: Cart) {
    if (localCart?.products.length !== dbCart.products.length) return false;
    for (let i = 0; i < localCart.products.length; i++) {
        if (localCart.products[i].productId !== dbCart.products[i].productId) return false;
        if (localCart.products[i].quantity !== dbCart.products[i].quantity) return false;
    }
    return true;
}

async function mergeCarts(localCart: Cart | null, dbCart: Cart, user: User) {
    // If there is a local cart, merge with database cart
    if (localCart && localCart.products.length > 0) {
        console.log("THERE ARE LOCAL CART and DB CART, MERGING...");
        localCart.products.forEach((product) => {
            const index = dbCart.products.findIndex(p => p.productId === product.productId);
            if (index === -1) {
                // Add new product 
                dbCart.products.push(product);
            } else {
                // Update quantity
                const newQty = dbCart.products[index].quantity + product.quantity;

                if (newQty > 0) {
                    dbCart.products[index].quantity = newQty;
                } else {
                    // Remove product
                    dbCart.products.splice(index, 1);
                }
            }
        });
        // Recalculate cart totals
        dbCart.cartCount = calculateCartCount(dbCart.products);
        dbCart.currentTotal = calculateCartTotal(dbCart.products);
        try {
            // Clear local cart  
            clearLocalCart();
            // Set new local cart
            setLocalCart(dbCart);

            // Clear database cart
            await clearDBCart(user.accessToken);
            // Update database
            await updateDBCart({
                products: dbCart.products,
                user: user,
            });

            return dbCart;
        } catch (err) {
            console.error('Error updating cart', err);
            throw err;
        }
    } else {
        // If no local cart, return database cart
        return dbCart;
    }
}

export const useGrocerStore = create<GrocerState>((set, get) => ({
    cart: null,
    isLoading: true,
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
                    const updatedCart = await mergeCarts(localCart, dbCart, user);
                    set({ cart: updatedCart, isLoading: false });
                    console.log("USER IS LOGGED IN", "THERE IS DB CART", get().cart);
                } else {
                    // If no cart in database, return local cart
                    set({ cart: localCart, isLoading: false });
                    console.log("USER IS LOGGED IN", "THERE IS NO DB CART", get().cart);
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
        // ADD TO LOCAL STORAGE
        products.forEach((prod) => {
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
}));
