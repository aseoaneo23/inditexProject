
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

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
        <div className="card flex justify-content-center">
                <Dropdown value={selectedBrand} onChange={(e) => setSelectedBrand(e.value)} options={brands} optionLabel="name"
                placeholder="Select a Inditex Brand" className="w-full md:w-14rem" />
        </div>
    );
}

export default Home;
