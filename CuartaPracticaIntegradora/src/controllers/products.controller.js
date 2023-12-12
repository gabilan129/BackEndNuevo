const {
  createProductService,
  deleteProductService,
  updateProductService,
} = require("../services/products.services");
const EErrors = require('../services/errors/errors-enum')
const CustomError = require('../services/errors/CustomError')
const {generateProductErrorInfo} = require('../services/errors/messages/product-creation-error.message')

const createProductController = async (req, res) => {
  let data = req.body;

  let respuesta = await createProductService(data);

  if (respuesta.status == "OK") {
    res.status(201).render("success");
  } else {
    res.status(500).render("error", {data: respuesta.message});
    req.logger.error(`Error al crear producto ${respuesta.message}`)
  }
};

const deleteProductController = async (req, res) => {
  let pid = req.params.pid;
  let userId = req.user._id
  let admin = req.user.admin
  let premium = req.user.premium

  let respuesta = await deleteProductService(pid,userId,admin,premium);

  if (respuesta.status == "OK") {
    res
      .status(200)
      .send({ status: "OK", message: "Producto eliminado correctamente" });
  } else {
    req.logger.error(`Error al eliminar producto: ${respuesta.message}`)
    res.status(500).send({ status: "ERROR", message: "Server Error" });
  }
};

const updateProductController = async (req, res) => {
  let pid = req.params.pid;
  let data = req.body;
  //data.owner = req.user._id
  let userId = req.user._id
  let admin = req.user.admin
  let premium = req.user.premium

  let respuesta = await updateProductService(pid, data, userId, admin, premium);

  if (respuesta.status == "OK") {
    res
      .status(200)
      .send({ status: "OK", message: "Producto actualizado correctamente" });
  } else {
    req.logger.error(`Error al actualizar producto: ${respuesta.message}`)
    res.status(500).send({ status: "ERROR", message: "Server Error" });
  }
};

const showErrorController = (req, res) => {
  res.render("error");
};

const showSuccessController = (req, res) => {
  res.render("success");
};

const showCreateProductController = (req, res) => {
  res.render("createproduct", { data: req.user._id });
};

const showUpdateProductController = (req, res) => {
  let {pid} = req.params
  res.render("updateproduct", { data: pid });
};

module.exports = {
  createProductController,
  deleteProductController,
  updateProductController,
  showErrorController,
  showSuccessController,
  showCreateProductController,
  showUpdateProductController,
};
