const { Router } = require("express")

const categoryRouter = Router()
const categoryModel = require("./Category")
const { default: slugify } = require("slugify")

categoryRouter.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/newCategory")
})

categoryRouter.get("/admin/categories", (req, res) => {
  categoryModel.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories })
  })
})


categoryRouter.get("/admin/categories/edit:id", (req, res) => { 
  let id = req.params.id

  categoryModel.findByPk(id)
  .then(categoria => { 
    if(categoria != undefined) { 
      res.redirect('/admin/categories')
    }
  })
})

categoryRouter.post("/categories/save", (req, res) => {
  let title = req.body.title

  if (title != undefined) {
    categoryModel
      .create({
        title: title,
        slug: slugify(title),
      })
      .then(() => {
        res.redirect("/")
      })
    return
  }

  res.redirect("/admin/categories/new")
})

categoryRouter.post("/categories/delete", (req, res) => {
  let id = req.body.id
  if (id != undefined) {
    if (!isNaN(id)) {
      categoryModel
        .destroy({
          where: {
            id: id,
          },
        })
        .then(() => {
          res.redirect("/admin/categories")
        })
    } else {
      res.redirect("/admin/categories")
    }
  } else {
    res.redirect("/admin/categories")
  }
})

module.exports = categoryRouter
