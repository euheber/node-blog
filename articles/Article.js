const connection = require("../database/connection")
const { Sequelize } = require("sequelize")
const Category = require("../categories/Category")

const Article = connection.define("Articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  slug:{ 
    type: Sequelize.STRING,
    allowNull:false
  }
})

Article.belongsTo(Category)
Category.hasMany(Article)

module.exports = Article
