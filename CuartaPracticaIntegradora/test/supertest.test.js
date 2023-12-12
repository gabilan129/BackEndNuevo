const chai = require("chai");
const supertest = require("supertest");
const uuid4 = require("uuid4");
const uuid = require("uuid4");

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("TestS TiendaLaurenti", () => {
  let sessioncookie;

  describe("Testeando Login", () => {
    //TEST LOGUEO

    it("Login en ruta /auth/login", async () => {
      //GIVEN
      const usuario = {
        username: "laurenti8@hotmail.com",
        password: "37767084",
      };

      //THEN
      const respuesta = await requester.post("/auth/login").send(usuario);

      sessioncookie = respuesta.headers["set-cookie"]; //Me guardo la cookie de la session para usarla luego en el la creacion de productos y muestra de carrito.

      expect(respuesta.statusCode).to.eql(302); //Me redigire a la pagina principal en caso de que el login sea correcto
      expect(respuesta.text).to.not.include("login"); //Si el login es incorrecto, me redirige a /auth/login. Busco que no este la palabra login.
    });
  });

  describe("Testeando Creacion de productos en ruta POST /products", async () => {
    //TEST CREO PRODUCTO
    it("Crear producto: RUTA POST /products debe crear un producto", async () => {
      //GIVEN - VERIFICAR QUE EL PRODUCTO YA NO FUE CREADO
      const producto = {
        title: "Producto de test",
        description: "Este es un producto creado por el test",
        code: uuid4(), //GENERO UN CODE ALEATORIO YA QUE ESTE NO SE PUEDE REPETIR SEGUN EL PRODUCT MODEL
        price: 111,
        stock: 10,
        category: "Productos de test",
        owner: "64b5ffdd0e6f0a79506824b9",
      };

      //THEN
      const respuesta = await requester
        .post("/products")
        .set("Cookie", sessioncookie)
        .send(producto);

      expect(respuesta.statusCode).to.eql(201); //VERIFICO QUE SE CREO QUE EL PRODUCTO CON EL STATUS 201
      expect(respuesta.text).to.include("BIEN"); //BUSCO LA PALABRA "BIEN" EN LA VISTA DE HANDLEBARS QUE DEVUELVE. 
    });
  });

  describe("Testeando show de carrito en ruta GET /carts/:usuario", async () => {
    //TEST SHOW CARRITO
    it("Ver carrito en GET /carts/:usuario debe devolver el carrito del usuario", async () => {
      //THEN
      const respuesta = await requester
        .get("/carts/64b5ffdd0e6f0a79506824b9")
        .set("Cookie", sessioncookie);

      expect(respuesta.statusCode).to.eql(200); //VERIFICO CODIGO DE STATUS 200
      expect(respuesta.text).to.not.include("MAL"); //VERIFICO QUE NO APARECE LA PALABRA MAL EN LA VISTA DE HANDLEBARS QUE DEVUELVE.
    });
  });
});
