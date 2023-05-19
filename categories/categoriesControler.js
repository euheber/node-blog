const { Router } = require("express");
const { default: slugify } = require("slugify");
const Category = require("./Category")
const route = Router()


route.get("/categories", (req, res) => {
    
    Category.findAll().then(category => { 
        res.render("admin/categories/categories", {categories:category})
    })
})

route.get("/admin/category/new", (req, res) => { res.render("admin/categories/newCategory")})

route.post("/categories/save", (req, res) => { 
    let title = req.body.title

    if(title != undefined){ 
        Category.create({ 
            title: title,
            slug: slugify(title)
        }).then(() => { res.redirect("/categories")})
    } else {
        res.redirect("/admin/category/new")
    }
 
})

route.post("/categories/delete", (req, res) => { 
    let id = req.body.id
    if(!isNaN(id)){
        Category.destroy({
            where: { 
                id:id
            }
        }).then(() => { 
            res.redirect("/categories")
        })
    } else { 
        res.redirect("/admin/category/new")
    }
})

route.get("/admin/categories/edit/:id", (req, res) => {
    const id = req.params.id 
    if(!isNaN(id)){ 
        Category.findByPk(id).then(category => { 
            res.render("admin/categories/edit", {category})
        })
    } else { 
        res.redirect("/admin/category/new")
    }
})

route.post("/admin/categories/update", (req, res) => { 
    const id = req.body.id
    const title = req.body.title

    Category.update({title: title, slug: slugify(title)}, {where: {id:id}}).then( () => res.redirect("/categories"))

})

module.exports = route