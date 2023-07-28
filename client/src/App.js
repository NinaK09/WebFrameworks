import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import DetailsProduct from "./components/DetailsProduct"
import AddCategory from "./components/AddCategory"
import DetailsCategory from "./components/DetailsCategory"
import EditCategory from "./components/EditCategory"

function App() {
  const user = localStorage.getItem("token")

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      {user && <Route path="/addProduct" exact element={<AddProduct />} />}
      {user && <Route path="/editProduct/:id" exact element={<EditProduct />} />}
      {user && <Route path="/detailsProduct/:id" exact element={<DetailsProduct />} />}

      {user && <Route path="/addCategory" exact element={<AddCategory />} />}
      {user && <Route path="/detailsCategory/:id" exact element={<DetailsCategory />} />}
      {user && <Route path="/editCategory/:id" exact element={<EditCategory />} />}
    </Routes>
  )
}
export default App
