import React from 'react';
import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react"
import { useParams, useNavigate, Link} from "react-router-dom"


const EditProduct = () => {
    const {id} = useParams();
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        price: "",
        quantity: "",
    })

    const [cat, setCat] = useState({
        id: "",
        name: "",
    })

    const handleOptionChange = (e) => {
        setData({...data, categoryId: e.target.value})
    }

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const throwError = message => {
        console.error(message);
        alert(message);
        throw Error(message);
    }
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const handleShow = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/routes/products/"+id
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            throwError(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(!data.categoryId == ""){
            const url = "http://localhost:8080/routes/products/"+id
            const { data: res } = await axios.put(url, data)
            navigate("/")
            }
            else{
                console.log("Wybierz kategorie")
                alert("Wybierz kategorię!");
				}
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

    const handleShowCat = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/routes/categories/show"
            const response = await axios.get(url);
            setCat(response.data.data);
        } catch (error) {
            throwError(error);
        }
    }

    return(
        <div className={styles.background_container}>
            <nav className={styles.navbar}>
            <Link to ={"/"}>
                <h1>MySite</h1>
                </Link>
                    <button className={styles.white_btn} onClick={handleLogout}>Wyloguj się</button>
            </nav>
            <div className={styles.block}>
            <h1>Edycja produktu</h1>
            <button className={styles.white_btn3} onClick={handleShow}>Uzupełnij wstępnie</button>
            <button className={styles.white_btn3} onClick={handleShowCat}>pobierz kategorie</button>
                <form className={styles.form_container}
                    onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Nazwa"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        required
                        className={styles.input}
                    /><br/>
                    <input
                        type="text"
                        placeholder="Cena"
                        name="price"
                        onChange={handleChange}
                        value={data.price}
                        required
                        className={styles.input}
                    /><br/>
                    <input
                        type="text"
                        placeholder="Ilość"
                        name="quantity"
                        onChange={handleChange}
                        value={data.quantity}
                        required
                        className={styles.input}
                    /><br/>

                    <select className={styles.select} name= "categoryId" id="categories" onChange={(e)=>handleOptionChange(e)} required>
                    <option name="categoryId" value=""> </option>
                    {cat.length > 0 ?  cat.map((category, k)=>
                        <option name="categoryId" value={category._id}>{category.name}</option>
                        ): <p></p>}
                    </select><br/>
                    
                    {error && <div
                        className={styles.error_msg}>{error}</div>}
                    <button type="submit"
                        className={styles.white_btn2}>
                        Edytuj
                    </button>
                </form>
                </div>
    </div>
    )
};

export default EditProduct;