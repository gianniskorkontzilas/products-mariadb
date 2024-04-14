
const EntitySchema = require('typeorm').EntitySchema

const UserEntity = new EntitySchema({
  name: "User",
  target: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    username: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    },
    name: {
      type: "varchar"
    },
    surname: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    },
  },
  relations: {
    products: {
      target: "Product",
      type: "many-to-many",
      joinTable: true,
      cascade: true
    },
    addresses: {
      type: 'one-to-many',
      target: 'Address',
      inverseSide: 'user',
      cascade: true
    },
    phones: {
      target: "Phone",
      type: "one-to-many",
      inverseSide: 'user',
      cascade: true
    }
  }
})

module.exports = { UserEntity }
