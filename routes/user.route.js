const express = require('express')
const router = express.Router()

const { body, param, validationResult } = require('express-validator')

const userController = require('../controllers/user.controller')

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
    body('username').not().isEmpty().withMessage("The field is required"),
    body('username').isString().withMessage("Enter only letters"),
    body('password').not().isEmpty().withMessage("The field is required"),
    body('password').isString().withMessage("Enter only letters"),
    body('name').not().isEmpty().withMessage("The field is required"),
    body('name').isString().withMessage("Enter only letters"),
    body('surname').not().isEmpty().withMessage("The field is required"),
    body('surname').isString().withMessage("Enter only letters")
  ]
}

const nameValidator = () => {
  return [
    body('username').not().isEmpty().withMessage("The field is required"),
    body('username').isString().withMessage("Enter only letters"),
    body('password').not().isEmpty().withMessage("The field is required"),
    body('password').isString().withMessage("Enter only letters"),
    body('name').not().isEmpty().withMessage("The field is required"),
    body('name').isString().withMessage("Enter only letters"),
    body('surname').not().isEmpty().withMessage("The field is required"),
    body('surname').isString().withMessage("Enter only letters")
  ]
}

router.get('/', userController.findAll)

router.get("/:id", idValidator(), (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()
    })
  }

  next()
}, userController.findOne)

router.post('/', nameValidator(), (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()
    })
  }
  next()
}, userController.insert)

router.patch('/:id',  updateValidator(), (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()
    })
  }
  next()
}, userController.update)

router.patch('/:id/products', userController.updateProducts)

router.delete('/:id', userController.delete)

router.delete('/:id/products', userController.deleteProducts)

module.exports = router