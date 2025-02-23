import { GlassIcon } from "../utils/iconIndex";
import "../css/customElements.css";
import React from 'react';
import { Switch } from 'antd';

const handleEnter = (e,setQuery) => {
    if (e.key === 'Enter') {
        setQuery(e.target.value);
    }
}

export const SearchInput = ({setQuery}) => {
    return (
        <div className="SearchInput">
            <GlassIcon /> <input type="text" placeholder={`Search`} onKeyDown={(e) => handleEnter(e,setQuery)} />
        </div>
    )
}


export const OnSaleSwitch = ({onSale, setOnSale}) => {
    return (
        <div className="center-text">
            <Switch onChange={() => setOnSale(!onSale)}/>
            <span style={{paddingLeft: '10px'}}>On Sale</span>
        </div>
    )
}

