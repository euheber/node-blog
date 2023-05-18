const { Router } = require("express");

const route = Router()

route.get("/articles", (req, res) => { 
    res.render("admin/articles/articles")
})


module.exports = route