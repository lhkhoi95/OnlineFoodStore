import axios from "axios";

export async function updateDBCart({ products, user }: { products: ProductInCart[], user: NextAuthUser }) {
    // remove products with quantity 0
    products = products.filter((product) => product.quantity > 0);

    if (products.length === 0) return null;

    const headers = {
        "Content-Type": "application/json",
        "auth-token": `${user.accessToken}`

    }
    const body = JSON.stringify({
        products: products,
    })
    try {
        const { data } = await axios.post("http://localhost:3000/cart", body, { headers: headers });

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to add product to cart");
    }
}

export async function clearDBCart(accessToken: string) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "auth-token": `${accessToken}`

        }
        const { data } = await axios.delete("http://localhost:3000/cart/", { headers: headers });

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to clear cart");
    }
}

export async function removeProductFromDB({ productId, user }: { productId: string, user: NextAuthUser }) {
    const headers = {
        "Content-Type": "application/json",
        "auth-token": `${user.accessToken}`
    }

    try {
        const { data } = await axios.delete(`http://localhost:3000/cart/removeProduct/${productId}`, { headers: headers });

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to remove product from cart");
    }
}

export async function getCartFromDB(accessToken: string) {
    // const fetcher = async (url: string, token: string) => await fetch(url, {
    //     headers: {
    //         "auth-token": token,
    //     }
    // }).then((res) => res.json());

    // const response = useSWR(["http://localhost:3000/cart", accessToken], fetcher);
    // console.log(response);
    // return response;
    try {
        const response = await axios.get("http://localhost:3000/cart", {
            headers: {
                "auth-token": accessToken,
            }
        }).then((res) => res.data);
        if (response) {
            // Calculate total price
            const totalPrice = response.products.reduce((total: number, product: ProductInCart) => {
                return total + (product.price * product.quantity);
            }, 0);
            const quantity = response.products.reduce((total: number, product: ProductInCart) => {
                return total + product.quantity;
            }, 0);
            const cart: Cart = {
                products: response.products,
                cartCount: quantity,
                currentTotal: totalPrice,
            }
            return cart;
        }
        return null;


    } catch (error) {
        console.log(error);
        return null;
    }



}
