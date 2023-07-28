import React from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom"
import axios from "axios"


const CategoryTable = (props) => {
    const category  = props.category;

    const throwError = message => {
        console.error(message);
        alert(message);
        throw Error(message);
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/routes/categories/"+category._id
            const response = await axios.delete(url);
            window.location.reload();
        } catch (error) {
            throwError(error);
        }
    }

return(
                <tr>
                    <td>{category.name}</td>
                    <Link to={`/editCategory/${category._id}`}>
                        <button value={category._id} className={styles.tab_btn}>edycja</button>
                    </Link>
                    <button value={category.id} className={styles.tab_btn} onClick = {handleDelete}>usuwanie</button>
                    <Link to={`/detailsCategory/${category._id}`}>
                    <button value={category.id} className={styles.tab_btn}>szczegóły</button>
                    </Link>
                </tr>
)
};

export default CategoryTable;