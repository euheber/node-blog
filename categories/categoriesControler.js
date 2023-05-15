const { Router } = require("express");

const categoryRouter = Router()


categoryRouter.get("/categories", (req, res) => { 
    res.send('Página de categorias')
})


module.exports = categoryRouter