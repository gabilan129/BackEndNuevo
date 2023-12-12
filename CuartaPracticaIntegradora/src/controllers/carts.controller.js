const {
  showCartService,
  addToCartService,
  deleteAllProductsService,
  deleteOneProductService,
  updateQuantityService,
  purchaseService,
} = require("../services/carts.sevices");

const showCartController = async (req, res) => {
  let usuario = req.params.usuario;
  let respuesta = await showCartService(usuario);
  if(respuesta.status == "OK"){
    res.status(200).render("carts", respuesta.data);
  }else{
    res.status(400).render("error", respuesta.message);
  }
  
};

const addToCartController = async (req, res) => {
  let usuario = req.params.usuario;
  let pid = req.params.pid;
  let premium = req.user.premium
  let uid = req.user._id

  let respuesta = await addToCartService(usuario, pid, premium, uid);

  if (respuesta.status == "OK") {
    res.status(200).send({
      status: "OK",
      message: "Se ha actualizado el carrito",
      data: respuesta.data,
    });
  } else {
    res.status(500).send({ error: "Server Error" });
  }
};

const deleteAllProductsController = async (req, res) => {
  let cid = req.params.cid;
  let respuesta = await deleteAllProductsService(cid);
  if (respuesta.status == "OK") {
    res.status(200).send({
      message: "Se ha eliminado el carrito",
      status: "OK",
    });
  } else {
    res.status(500).send({ error: "Server Error" });
  }
};

const deleteOneProductController = async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let respuesta = await deleteOneProductService(cid, pid);

  if (respuesta.status == "OK") {
    res.status(200).send({
      message: "Se eliminado el producto del carrito",
      status: "OK",
    });
  } else {
    res.status(500).send({ error: "Server Error" });
  }
};

const updateQuantityController = async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let cantidad = req.body.cantidad;

  let respuesta = await updateQuantityService(cid, pid, cantidad);

  if (respuesta.status == "OK") {
    res.status(200).send({
      message: "Se actualizado el producto del carrito",
      status: "OK",
    });
  } else {
    res.status(500).send({ error: "Server Error" });
  }
};

const purchaseController = async (req, res) => {
  let cid = req.params.cid;
  let email = req.user.username;

  let respuesta = await purchaseService(cid, email);

  if (respuesta.status == "OK") {
    console.log(respuesta.data);
    res.status(200).render("purchase", respuesta.data);
  } else {
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  showCartController,
  addToCartController,
  deleteAllProductsController,
  deleteOneProductController,
  updateQuantityController,
  purchaseController,
};
