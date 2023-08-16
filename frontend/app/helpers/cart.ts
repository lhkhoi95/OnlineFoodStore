export function calculateCartCount(products: ProductInCart[]) {
    // UPDATE THE CART COUNT
    const cartCount = products.reduce((total: number, product: ProductInCart) => {
        return total + product.quantity;
    }, 0);
    return cartCount;
}

export function calculateCartTotal(products: ProductInCart[]) {
    // UPDATE THE TOTAL PRICE
    const currentTotal = products.reduce((total: number, product: ProductInCart) => {
        return total + (product.price * product.quantity);
    }, 0);
    return currentTotal;
}

export function findQuantityById(cart: Cart | null, productId: string) {

    const quantity = cart?.products.find((product: ProductInCart) => {
        return product.productId === productId;
    })

    return quantity ? quantity.quantity : 0;
}