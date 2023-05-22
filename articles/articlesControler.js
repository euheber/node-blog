const { Router } = require("express")

const route = Router()

const Category = require("../categories/Category")
const Article = require("./Article")
const { default: slugify } = require("slugify")

route.get("/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category, required: true }],
  }).then((articles) => {
    res.render("admin/articles/articles", { articles })
  })
})

route.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((category) => {
    res.render("admin/articles/newArticle", { categories: category })
  })
})

route.post("/articles/save", (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const category = req.body.category

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    CategoryId: category,
  }).then(() => {
    res.redirect("/articles")
  })
})

route.post("/articles/delete", (req, res) => {
  const id = req.body.id

  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({ where: { id: id } }).then(() => {
        res.redirect("/articles")
      })
    } else {
      res.redirect("/admin/articles/new")
    }
  } else {
    res.redirect("admin/articles/new")
  }
})

module.exports = route
