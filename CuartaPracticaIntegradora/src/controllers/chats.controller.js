const {
  showMessagesServices,
  sendMessagesServices,
} = require("../services/chats.services");

const showMessagesController = async (req, res, next) => {
  let respuesta = await showMessagesServices();

  if (respuesta.status == "OK") {
    res.status(200);
    res.render("chat");
    next();
  } else {
    res.status(500).send({ error: "Server Error" });
  }
};

const sendMessagesController = async (req, res, next) => {
  let data = req.body;
  let respuesta = await sendMessagesServices(data);
  if (respuesta.status == "OK") {
    res
      .status(201)
      .send({ status: "OK", message: "Mensaje enviado correctamente" });
    next();
  } else {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  showMessagesController,
  sendMessagesController,
};
