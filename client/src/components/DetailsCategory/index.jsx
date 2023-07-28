import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

const DetailsProduct = () => {    
    const { id } = useParams();
    const [data, setData] = useState({
        id: "",
        name: "",
        price: "",
        quantity: "",
        categoryId: ""
    })

    const [cat, setCat] = useState({
        id: "",
        name: "",
    })

    const [error, setError] = useState("")

    const throwError = message => {
        console.error(message);
        alert(message);
        throw Error(message);
    }

    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
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
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const handleShowProd = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/routes/products/showCat/"+id
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            throwError(error);
        }
    }

    const ShowAll = (e) =>{
        handleShow(e);
        handleShowProd(e);
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
        <button className={styles.white_btn2} onClick={ShowAll}>Wyswietl Dane</button>
        </div>
        <div className={styles.block}>
            <h2>Dane szczegółowe kategorii:</h2>
            <p>Nazwa kategorii: {cat.name}</p>

            <h4>produkty należące do tej kategorii:</h4>
            {data.length > 0 ? data.map((product, k)=>
            <Link to={`/detailsProduct/${product._id}`}>
                        <li>{product.name}</li>
                        </Link>
                        ): <p></p>}
        </div>
    </div>
    )
}

export default DetailsProduct
