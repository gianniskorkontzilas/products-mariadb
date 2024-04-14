const express = require('express')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const dataSource = require('./connect').dataSource

const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}\n http://localhost:${PORT}`)
})