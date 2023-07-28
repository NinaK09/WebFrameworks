import React from 'react';
import styles from "./styles.module.css"
import {Link, useNavigate} from "react-router-dom"
import { useState} from "react"
import axios from "axios"

const ProductTable = (props) => {
    const product  = props.product;
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const throwError = message => {
        console.error(message);
        alert(message);
        throw Error(message);

    }

    const handleDelete = async (e) => {
        e.preventDefault() //dzieki tej linii strona sie nie przeladuje
        try {
            const url = "http://localhost:8080/routes/products/"+product._id
            const response = await axios.delete(url);
            window.location.reload();
        } catch (error) {
            throwError(error);
        }
    }

return(
                <tr>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <Link to={`/editProduct/${product._id}`}>
                        <button value={product._id} className={styles.tab_btn}>edycja</button>
                    </Link>
                    <button value={product.id} className={styles.tab_btn} onClick = {handleDelete}>usuwanie</button>
                    <Link to={`/detailsProduct/${product._id}`}>
                    <button value={product.id} className={styles.tab_btn}>szczegóły</button>
                    </Link>
                </tr>
)
};

export default ProductTable;