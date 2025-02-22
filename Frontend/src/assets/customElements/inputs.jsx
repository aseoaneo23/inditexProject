import { GlassIcon } from "../utils/iconIndex";
import "../css/customElements.css";
import React from 'react';
import { Switch } from 'antd';

export const SearchInput = () => {
    return (
        <div className="SearchInput">
            <GlassIcon /> <input type="text" placeholder={`Search`} />
        </div>
    )
}


export const OnSaleSwitch = () => {
    return (
        <div className="center-text">
            <Switch defaultChecked />
            <span style={{paddingLeft: '10px'}}>On Sale</span>
        </div>
    )
}

