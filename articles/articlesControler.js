const { Router } = require("express");

const articleModel = require("./Article")
const articlesRoute = Router()

const categoryModel = require("../categories/Category");
const { default: slugify } = require("slugify");

articlesRoute.get("/articles", (req, res) => { 
    res.send("página de artigos")
})

articlesRoute.get("/admin/articles/new", (req,res) => { 
    categoryModel.findAll().then(category => { 

        res.render("../views/admin/articles/newArticle", {categories:category})
    })
})

articlesRoute.post("/articles/save", (req, res) => { 
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    articleModel.create({ 
        title:title,
        slug: slugify(title),
        body: body,
        categoryId: category.id
    }).then(() => { 
        res.redirect("/articles")
    })
})

module.exports = articlesRoute