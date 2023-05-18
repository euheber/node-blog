const { Sequelize } = require("sequelize");

const connection = new Sequelize('blog', 'root', '2215', {  
    host: 'localhost',
    dialect: 'mysql',
    logging:false
})



module.exports = connection