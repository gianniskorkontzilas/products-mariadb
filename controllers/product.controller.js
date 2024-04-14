const productService = require('../services/product.service')


exports.findAll = async (req, res) => {
  console.log('Retrieving all Products in DB')

  try {

    const result = await productService.findAll()
    res.status(200).json({ status: true, data: result })

  } catch(err) {
    console.log( `Error in retrieving all Products \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id
  console.log(`Retrieving Product with id= ${id}`)

  try {

    const result = await productService.findOne(id)
    res.status(200).json({ status: true, data: result })

  } catch(err) {
    console.log( `Error in retrieving Product with id= ${id} \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.insert = async (req, res) => {
  const productName = req.body.product
  console.log(`Inserting new Product with productName: ${productName}`)
  
  try {

    const result = await productService.insert(req.body)
    res.status(200).json({ status: true, data: result })

  } catch (err) {
    console.log( `Error in inserting new Product with productName= ${productName} \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id
  console.log(`Updating Product with id= ${id}`)


  try {

    const result = await productService.update(req.body)
    res.status(200).json({ status: true, data: result })

  } catch(err) {
    console.log( `Error in updating Product with id= ${id} \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id
  console.log(`Deleting Product with id= ${id}`)

  try {

    const result = await productService.deleteProduct(id)
    res.status(200).json({ status: true, data: result })

  } catch(err) {
    console.log( `Error in deleting Product with id= ${id} \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}