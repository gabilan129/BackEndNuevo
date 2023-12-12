const {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById
} = require("../dao/mongo/products.mongo");
const EErrors = require('./errors/errors-enum')
const CustomError = require('./errors/CustomError')
const {generateProductErrorInfo} = require('./errors/messages/product-creation-error.message')

const createProductService = async (data) => {
  try {
    let productSaved = await createProduct(data);

    return {
      data: productSaved,
      status: "OK",
      message: "Se ha creado el producto correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const deleteProductService = async (pid, userId, admin, premium) => {
  try {

    if(admin){
      let productDeleted = await deleteProduct(pid);
    return {
      data: productDeleted,
      status: "OK",
      message: "Se ha eliminado el producto correctamente",
    };
  }
  if(premium){
    let producto = await findProductById(pid)
    if(producto.owner.equals(userId)){
      let productDeleted = await deleteProduct(pid);
      return {
        data: productDeleted,
        status: "OK",
        message: "Se ha eliminado el producto correctamente",
      };
    }else{
      return {
        status: "ERROR",
        message: 'No puede borrar ese producto porque no es el owner del mismo',
      };
    }
  }
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const updateProductService = async (pid, data, userId, admin, premium) => {
  try {
    if(admin){
    let productUpdated = await updateProduct(pid, data);
    return {
      data: productUpdated,
      status: "OK",
      message: "Se ha actualizado el producto correctamente",
    };
  }

  if(premium){
    let producto = await findProductById(pid)
    if(producto.owner.equals(userId)){
      let productUpdated = await updateProduct(pid, data);
      return {
        data: productUpdated,
        status: "OK",
        message: "Se ha actualizado el producto correctamente",
      };
    }else{
      return {
        status: "ERROR",
        message: 'No puede actualizar ese producto porque no es el owner del mismo',
      };
    }
  }  
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

module.exports = {
  createProductService,
  deleteProductService,
  updateProductService,
};
