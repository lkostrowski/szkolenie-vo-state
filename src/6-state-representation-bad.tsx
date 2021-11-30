import { useState } from 'react';

type Product = {
    id: string;
    name: string;
};

// Classic example - where is error?
const useFetchProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);

    const fetch = () => {
        setLoading(true);

        window
            .fetch('/products')
            .then((r) => r.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e as Error);
                setLoading(false);
            });
    };

    return { fetch, products, loading, error };
};

const ProductsList = () => {
    const { fetch, products, loading, error } = useFetchProductList();

    if (loading && error) {
        // This should never happen, but Typescript is ok with it!

        return <span>Should not happen</span>;
    }

    return (
        products.length && products.map((p) => <div key={p.id}>{p.name}</div>)
    );
};

// Dont model impossible states