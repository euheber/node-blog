const { Router } = require("express");
const route = Router()
const User =require("./User")


route.get("/admin/users", (req, res) => { 
    res.render("admin/admin")
})

route.get("/admin/create", (req, res) => { 
    res.send("Criando usuários")
})


module.exports = route