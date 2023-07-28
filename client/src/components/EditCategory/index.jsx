import React from 'react';
import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react"
import { useParams, useNavigate, Link} from "react-router-dom"

const EditProduct = () => {
    const {id} = useParams();
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const [cat, setCat] = useState({
        id: "",
        name: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setCat({ ...cat, [input.name]: input.value })
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
            const url = "http://localhost:8080/routes/categories/"+id
            const response = await axios.get(url);
            setCat(response.data.data);
        } catch (error) {
            throwError(error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const url = "http://localhost:8080/routes/categories/"+id
            const { cat: res } = await axios.put(url, cat)
            navigate("/")
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
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
            <h1>Edycja kategorii</h1>
            <button className={styles.white_btn2} onClick={handleShow}>Uzupełnij wstępnie</button>
                <form className={styles.form_container}
                    onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Nazwa"
                        name="name"
                        onChange={handleChange}
                        value={cat.name}
                        required
                        className={styles.input}
                    /><br/>
                    {error && <div
                        className={styles.error_msg}>{error}</div>}
                    <button type="submit"
                        className={styles.white_btn}>
                        Edytuj
                    </button>
                </form>
                </div>
    </div>
    )
};

export default EditProduct;