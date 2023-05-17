const { Router } = require("express");
const articleModel = require("./Article")
const articlesRoute = Router()

articlesRoute.get("/articles", (req,res) => { 
    res.render("../views/admin/articles/newArticle")
})

module.exports = articlesRoute