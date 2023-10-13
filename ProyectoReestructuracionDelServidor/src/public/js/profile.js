const logout = document.getElementById('logout');
const accessAdmin = document.getElementById('accessAdmin');
const cart = document.getElementById('cart');
const btnsAddCart = document.getElementsByClassName('btnAddCart');

const isAdmin = accessAdmin.value === "admin"


logout.addEventListener('click', e => {
    e.preventDefault();
    fetch('/api/users/logout', {
        method: 'GET',
    }).then(result => {
        if (result.status === 200) {
            alert('Sesion cerrada');
            window.location.replace('/users/login');
        }
    })
})



isAdmin ? "" : accessAdmin.style.display = "none";



for (let i = 0; i < btnsAddCart.length; i++) {
    if (btnsAddCart[i].value === "0") {
        btnsAddCart[i].disabled = true;
        btnsAddCart[i].style.backgroundColor = "grey";
    }
    btnsAddCart[i].addEventListener('click', ()=>{
        /* console.log(btnsAddCart[i].id); */
        fetch(`/api/carts/${cart.value}/products/add/${btnsAddCart[i].id}`, {
            method: 'PUT',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto agregado');
                location.reload();
            }
        })
    });
}

//Cuando se hace click en el boton de acceso a la pagina privada se redirecciona a la pagina privad
accessAdmin.addEventListener('click', e => {
    e.preventDefault();
    window.location.replace(`/api/users/private/${accessAdmin.value}`);
});

cart.addEventListener('click', e => {
    e.preventDefault();
    window.location.replace(`/api/carts/${cart.value}`);
});


async function addProd() {
    await fetch(`/api/carts/${cart.value}/products/add/${btnsAddCart[i].id}`, {
        method: 'PUT',
    }).then(result => {
        if (result.status === 200) {
            alert('Producto agregado');
            location.reload();
        }
    })
}

/* btnAdmin.addEventListener('click', e => {
    e.preventDefault();
    alert('Acceso denegado');
}) */

/* document.addEventListener('DOMContentLoaded', function() {
    // Coloca aquí el código para agregar eventos a los botones "admin"
    const adminButtons = document.getElementsByClassName('admin');

    for (let i = 0; i < adminButtons.length; i++) {
        adminButtons[i].addEventListener('click', function() {
            alert('Alerta: Botón de administrador clickeado');
            // Agrega aquí cualquier otra lógica que desees ejecutar cuando se haga clic en el botón de administrador
        });
    }
}); */