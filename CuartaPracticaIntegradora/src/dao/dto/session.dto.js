class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.nombre = user.nombre;
    this.apellido = user.apellido;
    this.role = user.admin == false ? "Usuario" : "Administrador";
    this.premium = user.premium == false ? "Usuario Estandar" : "Usuario Premium";
  }
}

module.exports = UserDTO;
