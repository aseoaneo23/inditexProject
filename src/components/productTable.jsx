import { ProductTouple } from "./productTouple";


export const ProductTable = (products) => {
   
    return (
        products.length > 0 ? (
        <table>
            <ProductTouple id={products.id} name={products.name} brand={products.brand} price={products.price} currency={products.currency}/>
        </table>) : (
            <div>
                <p>No products found</p>
            </div>
        )
    )
}