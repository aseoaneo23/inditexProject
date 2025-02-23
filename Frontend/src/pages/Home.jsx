import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import logitexLogo from "../assets/images/logitex_logo.png";
import { SearchInput, OnSaleSwitch } from "../assets/customElements/inputs";
import { ProductTable } from "../components/productTable";
import SimpleSlider from "../components/simpleSlider";

export const Home = () => {
    const API_URL = process.env.REACT_APP_INDITEX_ADAPTER_API;
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [query, setQuery] = useState("shirt");
    const [onSale, setOnSale] = useState(false);
    const [priceInterval, setPriceInterval] = useState([0, 100]);

    const brands = [
        { name: 'Zara', code: 'zara' },
        { name: 'Pull&Bear', code: 'pull_and_bear' },
        { name: 'Bershka', code: 'bershka' },
        { name: 'Stradivarius', code: 'stradivarius' },
        { name: 'Oysho', code: 'oysho' }
    ];

  
    async function getProducts() {
        try {
            setIsLoading(true);

            const params = {
                query: query,
                brand: selectedBrand,
            };

            const response = await axios.get(API_URL,
                {
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            if (onSale) {
                response.data = response.data.filter(product => product.price.value.original !== undefined);
                setProducts(response.data);
            }

            if (response.data.length > 0) {
                setProducts(response.data);
            }
        
            setIsLoading(false);

        } catch (error) {
            setProducts([]);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProducts()
    }, [query, selectedBrand, onSale, priceInterval]);

    return (
        <div>
            {isLoading ? (
                <div className="card">
                    <ProgressSpinner
                        style={{ width: "50px", height: "50px" }}
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration=".3s"
                    />
                </div>
            ) : (
                <div>
                    <section className="header">
                        <img src={logitexLogo} alt="Logitex Logo" style={{ width: '178px' }} />
                        <article>
                            <SearchInput setQuery={setQuery} />
                        </article>
                    </section>
                    <section className="filters">
                        <article>
                            <button className="clearFilters" onClick={
                                () => {
                                    setQuery("");
                                    setSelectedBrand(null);
                                    setOnSale(false);
                                    setPriceInterval([0, 100]);
                                }
                            }>Clear Filters</button>
                        </article>
                        <article>
                            <SimpleSlider />
                        </article>
                        <article>
                            <select name="selectBrands" id="selectBrands" onChange={(e) => setSelectedBrand(e.target.value)}>
                                <option value="">BRANDS</option>
                                {brands.map((brand) => (
                                    <option value={brand.code}>{brand.name}</option>
                                ))}
                            </select>
                        </article>
                        <article>
                            <OnSaleSwitch setOnSale={setOnSale} />
                        </article>
                    </section>
                    <hr />
                    <section>
                        <article className="product-table">
                            <ProductTable products={products} />
                        </article>
                    </section>
                    <hr />
                    <footer id="footer">
                       <p>© 2025 Logitex, S.A. All rights reserved.</p>
                       <p>Powered by <a href="https://www.logitex.com">Logitex</a></p>
                    </footer>
                </div>)}
        </div>
    );
};
