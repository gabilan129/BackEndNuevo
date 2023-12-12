const config = require('../../config/config')

//FUNCION ELIMINAR PRODUCTO
function eliminarProducto(cid, pid, usuario) {
  fetch(`/carts/${cid}/products/${pid}`, {
    method: "DELETE",
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/carts/${usuario}`;
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

//FUNCION ACTUALIZAR CANTIDAD CARRITO
function actualizarCantidad(cid, pid, usuario) {
  let cantidad = document.getElementById(`cantidad${pid}`).value;

  data = {
    cantidad: cantidad,
  };

  let dataJSON = JSON.stringify(data);

  fetch(`/carts/${cid}/products/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJSON,
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/carts/${usuario}`;
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

//FUNCION ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
function eliminarProductosCarrito(cid) {
  fetch(`/carts/${cid}`, {
    method: "DELETE",
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      if (respuesta.status == "OK") {
        window.location.href = `/`;
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
