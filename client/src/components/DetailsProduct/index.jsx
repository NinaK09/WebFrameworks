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

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
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

    const handleShowCat = async (e) => {
        const url2 = "http://localhost:8080/routes/categories/"+data.categoryId
        const response2 = await axios.get(url2);
        console.log(response2.data.data);
        if(response2.data.data == null){
            setCat({_id: "", name: "Kategoria nie istnieje; najprawdopodobniej została usunięta."})
        }
        else{
            setCat(response2.data.data)
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
            <button className={styles.white_btn2} onClick={handleShow}>Wyswietl Dane</button>
            <button disabled={data.length < 0} className={styles.white_btn2} onClick={handleShowCat}>Wyswietl Kategorie</button>
            </div>
            <div className={styles.block}>
                <h2>Dane szczegółowe produktu:</h2>
                <p>Nazwa produktu: {data.name}</p>
                <p>Cena za sztukę: {data.price}</p>
                <p>Ilość sztuk: {data.quantity}</p>
                <p>Kategoria: {cat.name}</p>
            </div>
        </div>
    )
}

export default DetailsProduct
