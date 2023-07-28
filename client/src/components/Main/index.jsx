import React from "react"
import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProductTable from './productTable';
import CategoryTable from './categoryTable';
import CategoryList from './categoryList';

const Main = () => {

    const [data, setData] = useState({
        id: "",
        name: "",
        price: "",
        quantity: "",
        categoryId: ""
    })

    const [cat, setCat] = useState({
        id: "",
        name: ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const handleShow = async (e) => {
        e.preventDefault() //strona sie nie przeladuje
        try {
            const url = "http://localhost:8080/routes/products/show"
            const response = await axios.get(url);
            setData(response.data.data);
            return response.data.data;
        } catch (error) {
            throwError(error);
        }

        const throwError = message => {
            console.error(message);
            alert(message);
            throw Error(message);
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            navigate("/addProduct")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleShowCat = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/routes/categories/show"
            const response = await axios.get(url);
            setCat(response.data.data);
        } 
		catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleAddCat = async (e) => {
        e.preventDefault()
        try {
            navigate("/addCategory")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const ShowAll = (e) => {
        handleShow(e);
        handleShowCat(e);
    }

    return (
        <div className={styles.background_container}>
            <nav className={styles.navbar}>
                <Link to={"/"}>
                    <h1>MySite</h1>
                </Link>
                <button className={styles.white_btn} onClick={handleLogout}>Wyloguj się</button>
            </nav>
            <div className={styles.block}>
                <button className={styles.white_btn2} onClick={ShowAll}>Wyświetl wszystko</button>
            </div>
            <div className={styles.block}>
                <h2>PRODUKTY</h2>
                <button className={styles.white_btn} onClick={handleAdd}>dodaj produkt</button>
                <div className={styles.table}>
                    <table>
                        <tr>
                            <th>nazwa</th>
                            <th>ilość</th>
                            <th>cena za sztukę</th>
                            <th>działania</th>
                        </tr>
                        {data.length > 0 ? data.map((product, k) =>
                            <ProductTable product={product} key={k} />
                        ) : <p></p>}
                    </table>
                </div>
                <button className={styles.white_btn} onClick={handleAdd}>dodaj produkt</button>
            </div>
            <div className={styles.block}>
                <h2>KATEGORIE</h2>
                <button className={styles.white_btn} onClick={handleAddCat}>dodaj kategorię</button>
                <div className={styles.table}>
                    <table>
                        <tr>
                            <th>nazwa</th>
                            <th>działania</th>
                        </tr>
                        {cat.length > 0 ? cat.map((category, k) =>
                            <CategoryTable category={category} key={k} />
                        ) : <p></p>}
                    </table>
                </div>
                <button className={styles.white_btn} onClick={handleAddCat}>dodaj kategorię</button>
            </div>

            <div className={styles.block}>
                <h3>Lista kategorii:</h3>
                <div className={styles.list}>
                    <ol>
                        {cat.length > 0 ? cat.map((category, k) =>
                            <CategoryList category={category} key={k} />
                        ) : <p></p>}
                    </ol>
                </div>
            </div>

        </div>
    )
}

export default Main
