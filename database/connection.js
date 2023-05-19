const { Sequelize } = require("sequelize");

const connection = new Sequelize('blog', 'root', '2215', {  
    host: 'localhost',
    dialect: 'mysql',
    logging:false,
    timezone: "-03:00"
})



module.exports = connection