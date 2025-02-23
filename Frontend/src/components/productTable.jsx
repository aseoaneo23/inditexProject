import { ProductTouple } from "./productTouple";
import "../assets/css/home.css";


export const ProductTable = (props) => {
   
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>BRAND</th>
                    <th>PRICE</th>
                    <th>ON SALE</th>
                </tr>
            </thead>
            {props.products.map((product) => (
                <ProductTouple id={product.id !== null ? product.id : "NULL"}
                 name={product.name !== null ? product.name : "No name"}
                 brand={product.brand !== null ? product.brand.toUpperCase() : "No brand"}
                 price={product.price.value.original !== null ? product.price.value.original : product.price.value.current} 
                 currency={product.price.currency !== null ? product.price.currency : "No currency"} 
                 OnSale = {product.price.value.original !== null ? product.price.value.current : ""}/>
            ))}
        </table>
    )
}