const { genereteProducts } = require("../services/mocking.services");

const showMockingController = async (req, res) => {
  let respuesta = await genereteProducts(100);
  let data = {
    informacion: {
      payload: respuesta.data,
    },
  };

  if (respuesta.status == "OK") {
    res.status(200).render("mockingproducts", data);
  } else {
    res.status(500).render("error");
  }
};

module.exports = {
  showMockingController,
};
