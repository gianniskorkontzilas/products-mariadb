const ProductEntity = require('../model/Product').ProductEntity
const { dataSource } = require('../connect')


function findAll() {
  const result = dataSource
    .getRepository(ProductEntity)
    .createQueryBuilder()
    .select('product')
    .from(ProductEntity, 'product')
    .getMany()

    return result
}

function findOne() {
  const result = dataSource
    .getRepository(ProductEntity)
    .createQueryBuilder()
    .select('prod')
    .from(ProductEntity, 'prod')
    .where('prod.id=:id', { id: id })
    .getOne()
  
  return result;
}

function insert(data) {
  const result = dataSource
    .getRepository(ProductEntity)
    .createQueryBuilder()
    .insert()
    .into(ProductEntity)
    .values([{
      product: data.product,
      cost: data.cost,
      description: data.description,
      quantity: data.quantity
    }])    
    .execute()
    .catch(error => console.log(error))

  return result
}

function update(data) {
  const result = dataSource
    .getRepository(ProductEntity)
    .createQueryBuilder()
    .update(ProductEntity)
    .set({
      product: data.product,
      cost: data.cost,
      description: data.description,
      quantity: data.quantity
    })
    .where('id = :id', { id: data.id })
    .execute()
    .catch(error => console.log(error))

  return result
}

function deleteProduct(productId) {
  const result = dataSource
    .getRepository(ProductEntity)
    .createQueryBuilder()
    .delete()
    .from(ProductEntity)
    .where('id = :id', { id: productId })
    .execute()
    .catch(error => console.log(error))

    return result
}

module.exports = { findAll, findOne, insert, update, deleteProduct }