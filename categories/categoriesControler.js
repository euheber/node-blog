const { Router } = require("express");
const route = Router()


route.get("/category", (req, res) => { 
    res.render("admin/categories/category")
})


module.exports = route