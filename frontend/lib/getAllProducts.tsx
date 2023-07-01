export default async function getAllProducts() {
    const products = await fetch('http://localhost:3000/products', { cache: "no-cache" });

    if (!products.ok) throw new Error('Failed to load products');
    return products.json();
}

