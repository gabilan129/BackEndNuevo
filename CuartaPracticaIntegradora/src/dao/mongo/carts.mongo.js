const Cart = require("./models/cartModels");

const findCartByUser = async (usuario) => {
  try {
    return await Cart.findOne({ usuario: usuario })
      .populate("productos.pid")
      .lean();
  } catch (error) {
    throw error;
  }
};

const findCartById = async (cid) => {
  try {
    return await Cart.findOne({ _id: cid }).populate("productos.pid").lean();
  } catch (error) {
    throw error;
  }
};

const createCart = async (usuario, productos) => {
  try {
    const newCart = new Cart({
      usuario: usuario,
      productos: productos,
    });
    return await newCart.save();
  } catch (error) {
    throw error;
  }
};

const updateCartProducts = async (usuario, productos) => {
  try {
    return await Cart.findOneAndUpdate(
      { usuario: usuario },
      { productos: productos },
      { new: true }
    ).populate("productos.pid");
  } catch (error) {
    throw error;
  }
};

const updateCartProductsByCid = async (cid, productos) => {
  try {
    return await Cart.findOneAndUpdate(
      { _id: cid },
      { productos: productos },
      { new: true }
    ).populate("productos.pid");
  } catch (error) {
    throw error;
  }
};

const deleteCart = async (cid) => {
  try {
    return await Cart.findOneAndDelete({ _id: cid });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findCartByUser,
  findCartById,
  createCart,
  updateCartProducts,
  updateCartProductsByCid,
  deleteCart,
};
