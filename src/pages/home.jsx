import React, { useState } from "react";
import IndifexLogo from '../assets/images/IndifexLogo.png';
import { SearchInput } from "../assets/customElements/inputs.jsx";
import { PriceSlider } from '../assets/customElements/slider.jsx';
import { Dropdown } from 'primereact/dropdown';
import { OnSaleSwitch } from '../assets/customElements/inputs.jsx';
import '../assets/css/home.css';
import { ProductTable } from '../components/productTable.jsx';

export const Home = () => {

    const [selectedBrand, setSelectedBrand] = useState(null);
    const brands = [
        { name: 'Zara', code: 'ZARA' },
        { name: 'Pull&Bear', code: 'PULL&BEAR' },
        { name: 'Bershka', code: 'BERSHKA' },
        { name: 'Stradivarius', code: 'STRADIVARIUS' },
        { name: 'Oysho', code: 'OYSHO' }
    ];


    return (
        <div>
            <section className="header">
                <img src={IndifexLogo} alt="Indifex Logo" style={{width: '128px'}}/>
                <article>
                    <SearchInput />
                </article>
            </section>
            <section className="filters">
                <article>
                    <PriceSlider style={{display: 'inline'}}/>
                </article>
                <article>
                    <Dropdown value={selectedBrand} onChange={(e) => setSelectedBrand(e.value)} options={brands} optionLabel="name" 
                    placeholder="Select a Brand" className="brand-select" />
                </article>
                <article>
                    <OnSaleSwitch />
                </article>
            </section>
            <hr />
            <section>
                <article className="product-table">
                    <ProductTable />
                </article>
            </section>
        </div>
    );
}
