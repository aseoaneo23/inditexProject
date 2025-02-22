import { GlassIcon } from "../utils/iconIndex";
import "../css/customElements.css";

export const SearchInput = () => {
    return (
        <div className="SearchInput">
            <GlassIcon /> <input type="text" placeholder={`Buscar`} />
        </div>
    )
}

export const OnSaleCheckbox = () => {
    return (
        <div className="OnSaleCheckbox">
            <input type="checkbox" id="checkbox" /> On Sale
        </div>
    )
}



