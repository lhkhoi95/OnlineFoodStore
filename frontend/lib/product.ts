import axios from "axios";
import useSWR from "swr";

export default function getAllProducts() {
    // const products = await fetch('http://localhost:3000/products', { cache: "no-cache" });

    // if (!products.ok) throw new Error('Failed to load products');
    // return await products.json();
    const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

    const response = useSWR(
        "http://localhost:3000/products",
        fetcher
    );
    return response;
}

export async function getProductById(productId: string) {
    const res = await fetch(`http://localhost:3000/products/${productId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}