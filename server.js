const express = require("express")
const app = express()
const connection = require('./database/connection')

const categoriesControler = require('./categories/categoriesControler')
const Category = require("./categories/Category")
const articlesControler = require("./articles/articlesControler")
const Article = require("./articles/Article")

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
connection
.authenticate()
.then(() =>{ console.log('Banco de dados conectado');})
.catch(error => { `opa, ${error}`})

app.use("", categoriesControler)
app.use("", articlesControler)

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(3030, () => {
  console.log("servidor rodando na porta 3030")
})
