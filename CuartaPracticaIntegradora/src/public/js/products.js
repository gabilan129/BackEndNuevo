
let socket = io();

socket.on("carrito", (data) => {
  renderCarrito(data);
});

//FUNCION PARA RENDERIZAR EL CARRITO
function renderCarrito(data) {
  if (data == null) {
  } else {
    const html = `<em> ${data.length} </em>`;
    document.getElementById("numeroCarrito").innerHTML = html;
  }
}

//FUNCION AGREGAR PRODUCTO
function addProduct(e) {
  //Tomo los datos del producto desde el formulario.
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    code: document.getElementById("code").value,
    price: document.getElementById("price").value,
    status: true,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    owner: document.getElementById("owner").value
  };

  let productJSON = JSON.stringify(product);

  fetch(`/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: productJSON,
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/products/success`;
      } else if (respuesta.status == "ERROR") {
        window.location.href = `/products/error`;
      }
    })
    .catch((err) => {});

  return false;
}

//FUNCION ELIMINAR PRODUCTO
function deleteProduct(id) {
  fetch(`/products/${id}`, {
    method: "DELETE",
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/products/success`;
      } else if (respuesta.status == "ERROR") {
        if (respuesta.status == "ERROR") {
          window.location.href = `/products/error`;
        }
      }
    })
    .catch((err) => {
      window.location.href = `/products/error`;
    });
}

//FUNCION BUSCAR PRODUCTO POR NOMBRE
function findProductByID(userID) {
  let filter = document.getElementById("idProducto").value;

  window.location.href = `/?filter=${filter}`;

  return false;
}

//FUNCION ACTUALIZAR PRODUCTO
function updateProduct(e) {
  let title = document.getElementById("title2").value;
  let description = document.getElementById("description2").value;
  let code = document.getElementById("code2").value;
  let price = document.getElementById("price2").value;
  let stock = document.getElementById("stock2").value;
  let category = document.getElementById("category2").value;

  const product = {};

  //Solo actualizo las caracteristicas completas en el formulario. Las que estan en blanco no se actualizan.

  if (title != "") {
    product.title = title;
  }
  if (description != "") {
    product.description = description;
  }
  if (code != "") {
    product.code = code;
  }
  if (price != "") {
    product.price = price;
  }
  if (stock != "") {
    product.stock = stock;
  }
  if (category != "") {
    product.category = category;
  }

  let productJSON = JSON.stringify(product);

  let id = document.getElementById("id2").value;

  fetch(`/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: productJSON,
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/products/success`;
      } else if (respuesta.status == "ERROR") {
        if (respuesta.status == "ERROR") {
          window.location.href = `/products/error`;
        }
      }
    })
    .catch((err) => {
      const html = `<em> Error: ${err} </em>`;
      document.getElementById("estado").innerHTML = html;
    });

  return false;
}

//FUNCION BUSCAR CARRITO POR USUARIO
function findCarritoById(userID) {
  window.location.href = `/carts/${userID}`;

  return false;
}

//FUNCION AGREGAR PRODUCTOAL CARRITO POR USUARIO
function agregarProducto(idproducto) {
  let usuario = document.getElementById("userID").innerText;

  fetch(`/carts/${usuario}/${idproducto}`, {
    method: "POST",
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/carts/${usuario}`;
      } else if (respuesta.status == "ERROR") {
        window.location.href = `/products/error`;
      }
    })
    .catch((err) => {
      window.location.href = `/products/error`;
    });
}

function cambiarPagina(limit, page) {
  window.location.href = `/?limit=${limit}&page=${page}`;
}

function ordenarAscendente(limit, page) {
  window.location.href = `/?limit=${limit}&page=${page}&sort=1`;
}

function ordenarDescendente(limit, page) {
  window.location.href = `/?limit=${limit}&page=${page}&sort=-1`;
}

function buscarProducto(filter) {
  window.location.href = `/?filter=${filter}`;
}

