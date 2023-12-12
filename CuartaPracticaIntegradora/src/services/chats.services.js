const { findMessages, createMessages } = require("../dao/mongo/chats.mongo");

const showMessagesServices = async () => {
  try {
    let mensajes = await findMessages();
    let messages = {
      messages: mensajes,
    };
    return {
      status: "OK",
      message: "Se ha eliminado el producto del carrito correctamente",
      data: messages,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const sendMessagesServices = async (data) => {
  try {
    let message = createMessages(data);
    return {
      status: "OK",
      message: "Se ha guardado el mensaje correctamente",
      data: message,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

module.exports = {
  showMessagesServices,
  sendMessagesServices,
};
