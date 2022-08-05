const { Role, User, Category, Product } = require('../models')
const { Types } = require('mongoose')


/*
*--------- User validators ---------
**/

//Check if the role is in DB
const isValidRole = async (role = '') => {
  if (role) {
    const isRole = await Role.findOne({ role })
    if (!isRole) throw new Error(`The role ${role} is not registered in the DB`)
  }
}

//Check for duplicated emails
const isEmailDuplicated = async (email = '') => {
  const dupEmail = await User.findOne({ email })
  if (dupEmail) {
    throw new Error(`The email: ${dupEmail} is already in use`)
  }
}

//Check if exist user with ID
const isExistingUser = async (id = '') => {

  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
  }

  const existingUser = await User.findById(id)
  if (!existingUser) {
    throw new Error(`The user with the id: ${id} doesn't exist on DB`)
  }
}

/*
*--------- Categories validators ---------
**/

//Check if exist category with ID
const isExistingCategory = async (id = '') => {

  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
  }

  const existingCategory = await Category.findById(id)
  if (!existingCategory) {
    throw new Error(`The category with the id: ${id} doesn't exist on DB`)
  }
}

//Check if name is already in use
const isCategoryNameUsed = async (name = '') => {

  const isNameUsed = await Category
    .findOne({ name: `${name.toUpperCase()}` })

  if (isNameUsed) {
    throw new Error(`The name ${name.toUpperCase()} is already in use, please try a different one`)
  }
}

/*
*--------- Product validators ---------
**/

const isExistingProduct = async (id = '') => {

  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
  }

  const existingCategory = await Product.findById(id)
  if (!existingCategory) {
    throw new Error(`The product with the id: ${id} doesn't exist on DB`)
  }
}
const isProductNameUsed = async (name = '') => {

  const isNameUsed = await Product
    .findOne({ name: `${name.toUpperCase()}` })

  if (isNameUsed) {
    throw new Error(`The name ${name.toUpperCase()} is already in use, please try a different one`)
  }
}

/*
*--------- Collection validators ---------
**/

const allowedCollections = (collection = '', collections = []) => {
  const isIncluded = collections.includes(collection);

  if (!isIncluded) {
    throw new Error(`The collection ${collection} is not allowed, ${collections}`)
  }

  return true
}

module.exports = {
  isValidRole,
  isEmailDuplicated,
  isExistingUser,
  isExistingCategory,
  isCategoryNameUsed,
  isExistingProduct,
  isProductNameUsed,
  allowedCollections
}
