import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const AddCategory = () => {
    const [cat, setCat] = useState({
        id: "",
        name: "",
        products: []
    })
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setCat({ ...cat, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            console.log(cat)
            const url = "http://localhost:8080/routes/categories/add"
            const { cat: res } = await axios.post(url, cat)
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
                <form className={styles.form_container}
                    onSubmit={handleSubmit}>
                    <h1>Dodawanie kategorii</h1>
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
                        Dodaj kategorię
                    </button>
                </form>
            </div>
        </div>
);
    
}
export default AddCategory