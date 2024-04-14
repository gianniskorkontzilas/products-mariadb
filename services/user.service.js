const { dataSource } = require('../connect')
const UserEntity = require('../model/User').UserEntity
const AddressEntity = require('../model/Address').AddressEntity
const PhoneEntity = require('../model/Phone').PhoneEntity

function findAll(data) {
  const result = dataSource
    .getRepository(UserEntity)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.products', 'product')
    .leftJoinAndSelect('user.addresses', 'address')
    .leftJoinAndSelect('user.phones', 'phone')
    .getMany()

    return result
}

function findOne(id) {
  const result = dataSource
    .getRepository(UserEntity)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.products', 'product')
    .leftJoinAndSelect('user.addresses', 'address')
    .leftJoinAndSelect('user.phones', 'phone')
    .where('user.id= :id', {id: id})
    .getMany()

    return result
}

function insert(data) {
  const user = {
    username: data.username,
    password: data.password,
    name: data.name,
    surname: data.surname,
    email: data.email,
    products: data.products,
    addresses: data.address,
    phones: data.phone
  }

  const insertedUser = dataSource
    .getRepository(UserEntity)
    .save(user)

  return insertedUser
}

async function update(data) {
  const result = dataSource
    .getRepository(UserEntity)
    .createQueryBuilder()
    .update(UserEntity)
    .set({
      password: data.password,
      name: data.name,
      surname: data.surname,
      email: data.email
    })
    .where('id = :id', { id: data.id })
    .execute()
    .catch(error => console.log(error))

    return result
}

async function updateProducts(data) {
  const actualRelationsShips = await dataSource
    .getRepository(UserEntity)
    .createQueryBuilder()
    .relation(UserEntity, "products")
    .of(data.id)
    .loadMany()

    const result = await dataSource
      .getRepository(UserEntity)
      .createQueryBuilder()
      .relation(UserEntity, "products")
      .of(data.id)
      .addAndRemove(data.products, actualRelationsShips)
      .catch(error => console.log(error))

    return result
}

function deleteUser(userId) {
  const result = dataSource
    .getRepository(UserEntity)
    .createQueryBuilder()
    .delete()
    .from(UserEntity)
    .where('id = :id', { id: userId })
    .execute()
    .catch(error => console.log(error))

  return result
}

function deleteUserProducts(data) {
  const result = dataSource
    .getRepository(UserEntity)
    .createQueryBuilder()
    .relation(UserEntity, "products")
    .of(data)
    .remove(data.products)
    .catch(error => console.log(error))

    return result
}

module.exports = { findAll, findOne, insert, update, updateProducts, deleteUser, deleteUserProducts }