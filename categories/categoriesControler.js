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

categoryRouter.get("/admin/categories/edit/:id", (req, res) => {
  let id = req.params.id


  if(isNaN(id)) res.redirect("/admin/categories")

  categoryModel
    .findByPk(id)
    .then((category) => {
      if (category != undefined) {
        res.render("admin/categories/edit", { category: category })
      } else {
        res.redirect("/admin/categories")
      }
    })
    .catch((erro) => res.redirect("/admin/categories"))
})


// ! post routes

categoryRouter.post("/categories/save", (req, res) => {
  let title = req.body.title

  if (title != undefined) {
    categoryModel
      .create({
        title: title,
        slug: slugify(title),
      })
      .then(() => {
        res.redirect("/admin/categories")
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

categoryRouter.post("/categories/update", (req, res) => { 
  let id = req.body.id
  let title = req.body.title

  categoryModel.update({title: title, slug:slugify(title)}, {where:{id:id}}).then(() => res.redirect("/admin/categories"))
})

module.exports = categoryRouter
