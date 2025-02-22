import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

export const Home = () => {
    const API_URL = process.env.REACT_APP_INDITEX_ADAPTER_API || "http://127.0.0.1:8000/api/productos/";
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getProducts() {
        try {
            console.log("📡 Solicitando productos desde:", API_URL);

            const response = await axios.get(API_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ Productos recibidos:", response.data);
            return response.data;

        } catch (error) {
            console.error("❌ Error en la petición:", error);
            return null;
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getProducts()
            .then((data) => {
                if (data) {
                    setProducts(data);
                }
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <h1>Home</h1>

            {isLoading ? (
                <div className="card">
                    <ProgressSpinner
                        style={{ width: "50px", height: "50px" }}
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration=".3s"
                    />
                </div>
            ) : products?.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <strong>{product.name}</strong> - {product.price.value.current} {product.price.currency}
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>No hay productos</h2>
            )}
        </div>
    );
};
