export const ProductTouple = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td> 
            <td>{props.brand}</td>
            <td>{props.price + props.currency}</td> 
        </tr>
    )
}

        