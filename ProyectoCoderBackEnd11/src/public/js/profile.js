const logout = document.getElementById('logout');
const accessAdmin = document.getElementById('accessAdmin');


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


//Habilitamos el boton de acceso a la pagina privada solo si el usuario es admin, aunque el boton aparezca por error si el usuario no esta habilitado como admin la pagina privada no se muestra, ya que se valida por la sesion

accessAdmin.value === "admin" ? "" : accessAdmin.style.display = "none";
accessAdmin.addEventListener('click', e => {
    e.preventDefault();
    console.log(accessAdmin.value);
    window.location.replace(`/api/users/private/${accessAdmin.value}`);
});

