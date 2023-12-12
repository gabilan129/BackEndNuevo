const {
  findCartByUser,
  findCartById,
  createCart,
  updateCartProducts,
  updateCartProductsByCid,
  deleteCart,
} = require("../dao/mongo/carts.mongo");

const {
  findProductById,
  findProductsByIds,
  updateProduct,
} = require("../dao/mongo/products.mongo");

const { createTicket } = require("../dao/mongo/ticket.mongo");
const uuid4 = require("uuid4");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Puedes utilizar otro proveedor de correo electrónico
  port: 587,
  auth: {
    user: "laurenticoderbackend@gmail.com",
    pass: "nosrarvgzfuqesnl",
  },
});

const showCartService = async (usuario) => {
  try {
    let carr = await findCartByUser(usuario);
    let data = {
      carrito: carr,
    };
    if (carr) {
      data.isEmpty = carr.productos.length > 0 ? false : true;
    } else {
      data.isEmpty = true;
    }
    return {
      status: "OK",
      message: "Se envia carrito",
      data: data,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const addToCartService = async (usuario, pid, premium, uid) => {
  let productos = [];
  let existeProducto = false;

  try {
    if (premium) {
      let producto = await findProductById(pid);
      if (producto.owner) {
        if (producto.owner.equals(uid)) {
          return {
            status: "ERROR",
            message:
              "No puede agregar ese producto porque lo creo usted mismo y es usuario premium",
          };
        }
      }
    }

    let cart = await findCartByUser(usuario);

    if (!cart) {
      productos.push({
        pid: pid,
        cantidad: 1,
      });

      let savedCart = await createCart(usuario, productos);

      return {
        status: "OK",
        message: "Se ha creado el carrito",
        data: savedCart,
      };
    } else {
      let productoEncontrado = {};
      let indexproducto = 0;
      cart.productos.forEach((producto, index) => {
        if (producto.pid._id == pid) {
          existeProducto = true;
          productoEncontrado = producto;
          indexproducto = index;
        }
      });

      if (existeProducto) {
        let productoNuevo = productoEncontrado;
        productoNuevo.cantidad = productoNuevo.cantidad + 1;
        cart.productos[indexproducto] = productoNuevo;

        let updatedCart = await updateCartProducts(usuario, cart.productos);

        return {
          status: "OK",
          message: "Se ha actualizado el carrito",
          data: updatedCart,
        };
      }

      if (!existeProducto) {
        cart.productos.push({
          pid: pid,
          cantidad: 1,
        });
        let newProductCart = await updateCartProducts(usuario, cart.productos);

        return {
          status: "OK",
          message: "Se ha actualizado el carrito",
          data: newProductCart,
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

const deleteAllProductsService = async (cid) => {
  try {
    let respuesta = await deleteCart(cid);
    return {
      status: "OK",
      message: "Se ha eliminado el carrito correctamente",
      data: respuesta,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const deleteOneProductService = async (cid, pid) => {
  try {
    let carr = await findCartById(cid);

    if (!carr) {
      return {
        status: "ERROR",
        message: "No se pudo encontrar el carrito",
      };
    }

    let productos = carr.productos.filter(
      (producto) => producto.pid._id != pid
    );

    let updatedCart = await updateCartProductsByCid(cid, productos);

    return {
      status: "OK",
      message: "Se ha eliminado el producto del carrito correctamente",
      data: updatedCart,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const updateQuantityService = async (cid, pid, cantidad) => {
  try {
    let carr = await findCartById(cid);

    let productos = carr.productos;

    let producto = productos.find((producto) => producto.pid._id == pid);
    producto.cantidad = cantidad;

    let cart = await updateCartProductsByCid(cid, productos);

    return {
      status: "OK",
      message: "Se ha actualizado el carrito correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const purchaseService = async (cid, email) => {
  try {
    let sumaTotal = 0;

    //Me traigo el carrito
    let carr = await findCartById(cid);
    let carrModificado = { ...carr };

    //Me separo todos los ID de productos
    let productsID = [];

    carr.productos.forEach((producto) => {
      productsID.push(producto.pid._id);
    });

    //Me traigo todos los productos que estan en el carrito y verifico el stock
    let productosbuscados = await findProductsByIds(productsID);

    let idComprados = [];
    let idNoComprados = [];

    //Actualizo el stock de los productos comprados:
    for (let index = 0; index < carr.productos.length; index++) {
      let productoFiltrado = productosbuscados.filter((item) =>
        item._id.equals(carr.productos[index].pid._id)
      );

      if (carr.productos[index].cantidad <= productoFiltrado[0].stock) {
        let stockrestante =
          productoFiltrado[0].stock - carr.productos[index].cantidad;
        let productUpdated = await updateProduct(
          carr.productos[index].pid._id,
          { stock: stockrestante }
        );
        sumaTotal +=
          carr.productos[index].cantidad * carr.productos[index].pid.price;
        idComprados.push(carr.productos[index].pid._id);
        carrModificado.productos = carrModificado.productos.filter(
          (producto) => producto.pid._id !== carr.productos[index].pid._id
        );
      } else {
        idNoComprados.push(carr.productos[index].pid._id);
      }
    }

    //ACTUALIZO EL CARRITO Y DEJO SOLAMENTE LO QUE NO SE COMPRO

    let updatedCart = await updateCartProductsByCid(
      cid,
      carrModificado.productos
    );

    //CREO EL TICKET DE COMPRA
    let data = {
      code: uuid4(),
      amount: sumaTotal,
      purchaser: email,
    };

    let ticket = await createTicket(data);

    ticket.productosComprados = idComprados;
    ticket.productosNoComprados = idNoComprados;

    //Envio email

    const mailOptions = {
      from: "Tienda Laurenti",
      to: email,
      subject: "Compra realizada correctamente",
      text: `Su compra fue procesada correctamente. Pronto despacharemos su pedido.`,
    };
    
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return {
          status: "ERROR",
          message: error,
        };
      }
    });

    return {
      data: ticket,
      status: "OK",
      message: "Se ha realizado la compra correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

module.exports = {
  showCartService,
  addToCartService,
  deleteAllProductsService,
  deleteOneProductService,
  updateQuantityService,
  purchaseService,
};
