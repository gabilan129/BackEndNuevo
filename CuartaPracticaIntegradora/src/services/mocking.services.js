const faker = require('@faker-js/faker')

const genereteProducts = async (cantidad) => {
  try {
    let productos = [];

    for (let i = 0; i < cantidad; i++) {

      let product = {
        _id: faker.fakerES.database.mongodbObjectId(),
        title: faker.fakerES.commerce.productName(),
        description: faker.fakerES.commerce.productDescription(),
        code: faker.fakerES.string.alphanumeric(6),
        price: faker.fakerES.commerce.price(),
        status: faker.fakerES.datatype.boolean(),
        stock: faker.fakerES.number.int({min:0, max:1000}),
        category: faker.fakerES.commerce.department(),
        thumbnail: []
      };
      productos.push(product);
    }
    return {
      status: "OK",
      message: "Se han traido los productos desde Faker",
      data: productos,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

module.exports = {
    genereteProducts
}
