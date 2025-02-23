export const ProductTouple = (props) => {

    const specialStyles = props.OnSale ? {color: "red", textDecoration: "line-through"} : {};
    return (
        <tr>
            <td><a href="">{props.id}</a></td>
            <td>{props.name}</td> 
            <td>{props.brand}</td>
            <td style={specialStyles}>{props.price + " " + props.currency}</td>
            <td>{props.OnSale ? props.OnSale + " " + props.currency : ""}</td>
        </tr>
    )
}

        