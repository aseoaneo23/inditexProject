import { FiltrosIcon, BarsIcon, UserIcon } from "../utils/iconIndex";
import "../css/customElements.css";

export const FilterButton = () => {
    return (
        <button className="FilterButton">
            <FiltrosIcon /> FILTROS
        </button>
    )
}

export const BarsButton = () => {
    return (
        <button className="BarsButton">
            <BarsIcon />
        </button>
    )
}

export const UserButton = () => {
    return (
        <button className="UserButton">
            <UserIcon />
        </button>
    )
}
