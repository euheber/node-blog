const { Router } = require("express")
const route = Router()
const User = require("./User")
const bcrypt = require("bcryptjs")

route.get("/admin/users", (req, res) => {
    User.findAll().then(users => { 

        res.render("admin/admin", {users})
    })
})

route.get("/admin/create", (req, res) => {
  res.render("admin/create")
})

route.post("/admin/create/user", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

    User.findOne({where: { 
        email:email
    }}).then(user =>  { 
        if(user == undefined){ 
            User.create({
                email:email,
                password: hash
            }).then(() => res.redirect("/admin/users"))
        } else { res.redirect("/admin/create")}
    })

})

module.exports = route
