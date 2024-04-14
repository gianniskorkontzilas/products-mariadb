const express = require('express')
const router = express.Router()

const { body, param, validationResult } = require('express-validator')

const productController = require('../controllers/product.controller')

const idValidator = () => {
  return [
    param('id').isNumeric().withMessage('Invalid id. It requires a number')
  ]
}

const updateValidator = () => {
  return [
    param('id').isNumeric().withMessage('Invalid id. It requires a number'),
    body('id').isNumeric().withMessage('Invalid id. It requires a number'),
    body('id').not().isEmpty().withMessage('Field id is required'),
    body('product').isString().withMessage('The name field is string. Enter only letters'),
    body('product').not().isEmpty().withMessage('Field name is required'),
    body('cost').isNumeric().withMessage('Invalid id. It requires a number'),
    body('cost').not().isEmpty().withMessage('Field id is required'),
    body('description').isString().withMessage('The name field is string. Enter only letters'),
    body('description').not().isEmpty().withMessage('Field name is required'),
    body('quantity').isNumeric().withMessage('Invalid id. It requires a number'),
    body('quantity').not().isEmpty().withMessage('Field id is required')
  ]
}

const nameValidator = () => {
  return [
    body('product').not().isEmpty().withMessage("The field is required"),
    body('product').isString().withMessage("Enter only letters")
  ]
}

router.get('/', productController.findAll)

router.get("/:id", idValidator(), (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()
    })
  }

  next()
}, productController.findOne)

router.post('/', nameValidator(), (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()
    })
  }
  next()
}, productController.insert)

router.patch('/:id', updateValidator(), (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()
    })
  }
  next()
}, productController.update)

router.delete('/:id', productController.delete)


module.exports = router