const EntitySchema = require('typeorm').EntitySchema

const ProductEntity = new EntitySchema({
  name: "Product",
  target: "Product",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    product: {
      type: "varchar"
    },
    cost: {
      type: "decimal"
    },
    description: {
      type: "text"
    },
    quantity: {
      type: "int"
    }
  }
})

module.exports = { ProductEntity }