require('dotenv').config()
const express = require('express')
const app = express()
const connection = require('./db')
connection()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const productsRoutes = require("./routes/products")
const categoriesRoutes = require("./routes/categories")

//===ROUTES===
app.use("/routes/users", userRoutes)
app.use("/routes/auth", authRoutes)
app.use("/routes/products", productsRoutes)
app.use("/routes/categories", categoriesRoutes)

//=========
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))