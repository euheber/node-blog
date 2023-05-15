const { Sequelize } = require("sequelize")
const connect = require("../database/connection")
const Category = require("../categories/Category")

const Article = connect.define("Articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: { 
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article)
Article.belongsTo(Category)



module.exports = Article
