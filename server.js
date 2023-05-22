const connection = require("./database/connection")
const categoriesControler = require("./categories/categoriesControler")
const articlesControler = require("./articles/articlesControler")
const Article = require("./articles/Article")
const Category = require("./categories/Category")
const express = require('express')
const app = express()
const port = 3000

connection
.authenticate()
.then(() => console.log('Conexão com o servidor executada com sucesso'))
.catch(err => console.log(err))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/", categoriesControler)
app.use("/", articlesControler)


app.get('/', (req, res) => {
    Article.findAll().then( articles => { 
        res.render('index', {articles})
    })
})

app.get("/ler/:slug", (req, res) => {
    const slug = req.params.slug

    if(slug != undefined) {
        Article.findOne({where: { 
            slug:slug
        }}).then(article => { 
            res.render("admin/articles/article", {article})
        })
    } else { 
        res.redirect("/index")
    }
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`))