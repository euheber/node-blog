const { Router } = require("express");

const articlesRoute = Router()

articlesRoute.get("/articles", (req,res) => { 
    res.send("Rota de artigos")
})

module.exports = articlesRoute