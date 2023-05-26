const connection = require("./database/connection")
const categoriesControler = require("./categories/categoriesControler")
const articlesControler = require("./articles/articlesControler")
const userControler = require("./Admin/userControler")
const Article = require("./articles/Article")
const Category = require("./categories/Category")
const express = require("express")
const app = express()
const port = 3000

connection
  .authenticate()
  .then(() => console.log("Conexão com o servidor executada com sucesso"))
  .catch((err) => console.log(err))

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", categoriesControler)
app.use("/", articlesControler)
app.use("/", userControler)

app.get("/", (req, res) => {
  Article.findAll().then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles, categories })
    })
  })
})

app.get("/ler/:slug", (req, res) => {
  const slug = req.params.slug

  if (slug != undefined) {
    Article.findOne({
      where: {
        slug: slug,
      },
    }).then((article) => {
      Category.findAll().then((categories) => {
        res.render("admin/articles/article", { article, categories })
      })
    })
  } else {
    res.redirect("/index")
  }
})



app.get("/category/:slug", (req, res) => { 
  const slug = req.params.slug

  Category.findOne({where: { 
    slug: slug
  }, include: [{model:Article}]}).then(category => { 
    if(category != undefined) { 
      Category.findAll().then(categories => { 
        res.render("index", {articles: category.Articles, categories})
      })
    } else { 
      res.redirect("/")
    }
  })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`))
