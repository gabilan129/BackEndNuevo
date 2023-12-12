const Product = require("./models/productModels");
const EErrors = require('../../services/errors/errors-enum')
const CustomError = require('../../services/errors/CustomError')
const {generateProductErrorInfo, updateProductErrorInfo} = require('../../services/errors/messages/product-creation-error.message')

const createProduct = async (data) => {
  console.log(data)
  
  try {
    if(data.title == '' || data.description == '' || data.code == '' || data.price == '' || data.stock == '' || data.category == ''){
      CustomError.createError({
        name: 'Product create error',
        cause: generateProductErrorInfo(data),
        message: 'Error al crear producto, una o varias propiedades estan vacias.',
        code: EErrors.INVALID_TYPES_ERROR
      }) 
    }
    let product = new Product(data);
    return await product.save();
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (pid) => {
  try {
    return await Product.deleteOne({ _id: pid });
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (pid, data) => {
  try {
    return await Product.updateOne({ _id: pid }, data);
  } catch (error) {
    throw error;
  }
};

const findProductById = async (pid) => {
  try {
    return await Product.findOne({ _id: pid });
  } catch (error) {
    throw error;
  }
};

const findProductsByIds = async (pids) => {
  try {
    return await Product.find({ _id: { $in: pids } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  findProductsByIds,
};
