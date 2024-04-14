
const userService = require("../services/user.service")


exports.findAll = async (req, res) => {
  console.log(`Retrieving all Users`)

  try {
    const result = await userService.findAll()
    res.status(200).json({ status: true, data: result })
  } catch (err) {
    console.log( `Error in finding all Users \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id
  console.log(`Retrieving user with id= ${id}`)

  try {
    const result = await userService.findOne(id)
    res.status(200).json({ status: true, data: result })
  } catch (err) {
    console.log(`Error retrieving user with id= ${id}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.insert = async (req, res) => {
  const data = req.body
  console.log('Inserting user in the database')

  try {
    const result = await userService.insert(data)
    res.status(200).json({ status: true, data: result })
  } catch(err) {
    console.log(`Error in inserting a new user \n ${err}`)
    res.status(400).json({ status: false, data: err })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id
  console.log(`Updating User with id= ${id}`)

  try {

    const result = userService.update(req.body)
    res.status(200).json({ status: true, data: result })

  } catch(err) {
    console.log('Error in updating the User')
    res.status(400).json({ status: false, data: err })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id
  console.log(`Deleting User with id= ${id}`)

  try {

    const result = userService.deleteUser(id)
    res.status(200).json({ status: true, data: result })

  } catch(err) {
    console.log('Error in deleting the User')
    res.status(400).json({ status: false, data: err })
  }
}

exports.updateProducts = async (req, res) => {
  const id = req.params.id
  console.log(`Update products of the User with id = ${id}`)

  try {

    const result = userService.updateProducts(req.body)
    res.status(200).json({status: true, data: result})
    
  } catch (err) {
    console.log( `Error in updating User's product list`)
    res.status(400).json({status: false, data: err})
  }
}

exports.deleteProducts = async (req, res) => {
  const data= req.body
  console.log(`Delete Products from User with id ${req.params.id}`)

  try {

    const result = await userService.deleteUserProducts(data)
    res.status(200).json({status: true, data: result})

  } catch (err) {
    console.log( `Error in deleting User's product`)
    res.status(400).json({status: false, data: err})
  }
}
