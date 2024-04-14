const typeorm = require('typeorm')

require('dotenv').config()

const UserEntity = require('./model/User').UserEntity
const ProductEntity = require('./model/Product').ProductEntity


const dataSource = new typeorm.DataSource({
  type: "mariadb",
  host: process.env.HOST,
  port: 3306,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [UserEntity, ProductEntity],
  synchronize: true
})

dataSource
  .initialize()
  .then(function() {
    console.log('Connected to database')
  })
  .catch(function(error) {
    console.log('Error for connecting with the database:', error)
  })

module.exports = { dataSource }