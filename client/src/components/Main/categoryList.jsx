import React from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom"
import axios from "axios"
import { useState } from "react"


const CategoryList = (props) => {
    const category  = props.category;

    const [data, setData] = useState({
        id: "",
        name: "",
        price: "",
        quantity: "",
        categoryId: ""
    })

    const throwError = message => {
        console.error(message);
        alert(message);
        throw Error(message);
    }

    const handleShowProd = async (e) => {
        e.preventDefault() //strona sie nie przeladuje
        try {
            const url = "http://localhost:8080/routes/products/showCat/"+category._id
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            throwError(error);
        }
    }

return(
        <li className={styles.catName}>
            <Link to={`/detailsCategory/${category._id}`}>
                {category.name}
            </Link>
            <button className={styles.tab_btn} onClick={handleShowProd}>wyswietl</button>
            <ul>
                {data.length > 0 ? data.map((product, k)=>
                        <li><Link to={`/detailsProduct/${product._id}`}>{product.name}</Link></li>
                        ): <p></p>}
            </ul>
        </li>

)
};

export default CategoryList;