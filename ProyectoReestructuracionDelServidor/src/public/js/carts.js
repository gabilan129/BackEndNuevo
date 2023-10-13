const aumentar = document.getElementsByClassName('aumentar');
const reducir = document.getElementsByClassName('reducir');
const eliminar = document.getElementsByClassName('eliminar');
const finalizar = document.getElementById('finalizar');


/* aumentar.addEventListener('click', addProd);
reducir.addEventListener('click', reduceProd)
eliminar.addEventListener('click', delProd)
 */
for(let i = 0; i < aumentar.length; i++){
    aumentar[i].addEventListener('click', ()=>{
        fetch(`/api/carts/${finalizar.value}/products/add/${aumentar[i].id}`, {
            method: 'PUT',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto agregado');
                location.reload();
            }
        })
    })
}

for(let i = 0; i < reducir.length; i++){
    reducir[i].addEventListener('click', ()=>{
        fetch(`/api/carts/${finalizar.value}/products/reduce/${reducir[i].id}`, {
            method: 'DELETE',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto eliminado');
                location.reload();
            }
        })
    })
}

for(let i = 0; i < eliminar.length; i++){
    eliminar[i].addEventListener('click', ()=>{
        fetch(`/api/carts/${finalizar.value}/products/delete/${eliminar[i].id}`, {
            method: 'DELETE',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto eliminado');
                location.reload();
            }
        
        })
    })
}




async function delProd() {
    await fetch(`/api/carts/${finalizar.value}/products/delete/${eliminar.id}`, {
        method: 'DELETE',
    }).then(result => {
        if (result.status === 200) {
            alert('Producto eliminado');
            location.reload();
        }
    })
};

async function addProd() {
    await fetch(`/api/carts/${finalizar.value}/products/add/${aumentar.id}`, {
        method: 'PUT',
    }).then(result => {
        if (result.status === 200) {
            alert('Producto agregado');
            location.reload();
        }
    })
};

async function reduceProd() {
    await fetch(`/api/carts/${finalizar.value}/products/reduce/${reducir.id}`, {
        method: 'DELETE',
    }).then(result => {
        if (result.status === 200) {
            alert('Producto eliminado');
            location.reload();
        }
    })
}


