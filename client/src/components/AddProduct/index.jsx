import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const AddProduct = () => {

    const [data, setData] = useState({
        name: "",
        price: "",
        quantity: "",
        categoryId: ""
    })

    const [cat, setCat] = useState({
        id: "",
        name: "",
    })

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleOptionChange = (e) => {
        setData({...data, categoryId: e.target.value})
    }

    const throwError = message => {
        console.error(message);
        alert(message);
        throw Error(message);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(!data.categoryId == ""){
                const url = "http://localhost:8080/routes/products/add"
                const { data: res } = await axios.post(url, data)
                navigate("/")
            }
            else{
                alert("Wybierz kategorię!");
            }
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
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }


    return (
        <div className={styles.background_container}>
        <nav className={styles.navbar}>
        <Link to ={"/"}>
            <h1>MySite</h1>
            </Link>
                <button className={styles.white_btn} onClick={handleLogout}>Wyloguj się</button>
        </nav>
            <div className={styles.block}>
            <button className={styles.white_btn2} onClick={handleShowCat}>Pobierz kategorie</button>
            </div>
            <div className={styles.block}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Dodawanie produktu</h1>
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
                    
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.white_btn2}>Dodaj produkt</button>
                </form>
            </div>
        </div>
);  
}

export default AddProduct
