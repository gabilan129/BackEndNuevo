const { findUser, findUserById } = require("../dao/mongo/users.mongo");
const { changeMembershipService, showUploadFilesService, uploadFilesService } = require("../services/user.services");
const User = require("../dao/mongo/models/userModel");

const changeMembershipController = async (req, res) => {
  let { uid } = req.params;
  let user = req.user;

  let respuesta = await changeMembershipService(uid, user);

  if (respuesta.status == "OK") {
    res.status(200).render("success", { data: respuesta.message });
  } else {
    req.logger.error(`Error al cambiar la membresia: ${respuesta.message}`);
    res.status(500).render("error", { data: respuesta.message });
  }
};

const showUploadFilesController = async (req, res) => {
  const { uid } = req.params;

  let respuesta = await showUploadFilesService(uid)

  if (respuesta.status == "OK") {
    res.status(200).render("uploadfiles", { data: respuesta.data });
  } else {
    req.logger.error(`Error: ${respuesta.message}`);
    res.status(500).render("error", { data: respuesta.message });
  }

  
};

const UploadFilesController = async (req, res) => {
  const { uid } = req.params;
  const archivos = req.files;

  let respuesta = await uploadFilesService(uid, archivos)

  if(respuesta.status == "OK"){
    res.status(201).render("success")
  }else{
    req.logger.error(`Error: ${respuesta.message}`);
    res.status(500).render("error", { data: respuesta.message });
  }

  // let archivosarray = [];

  // if (archivos.imagenperfil) {
  //   let imagenperfil = {
  //     name: archivos.imagenperfil[0].fieldname,
  //     reference: archivos.imagenperfil[0].path,
  //   };
  //   archivosarray.push(imagenperfil);
  // }

  // if (archivos.imagenproducto) {
  //   let imagenproducto = {
  //     name: archivos.imagenproducto[0].fieldname,
  //     reference: archivos.imagenproducto[0].path,
  //   };
  //   archivosarray.push(imagenproducto);
  // }

  // if (archivos.identificacion) {
  //   let identificacion = {
  //     name: archivos.identificacion[0].fieldname,
  //     reference: archivos.identificacion[0].path,
  //   };
  //   archivosarray.push(identificacion);
  // }

  // if (archivos.domicilio) {
  //   let domicilio = {
  //     name: archivos.domicilio[0].fieldname,
  //     reference: archivos.domicilio[0].path,
  //   };
  //   archivosarray.push(domicilio);
  // }

  // if (archivos.estadocuenta) {
  //   let estadocuenta = {
  //     name: archivos.estadocuenta[0].fieldname,
  //     reference: archivos.estadocuenta[0].path,
  //   };
  //   archivosarray.push(estadocuenta);
  // }

  // let usuario = await findUserById(uid);

  // if (usuario.documents) {
  //   usuario.documents = [...usuario.documents, ...archivosarray];
  // } else {
  //   usuario.documents = archivosarray;
  // }

  // let usuarioActualizado = await User.findOneAndUpdate(
  //   { _id: uid },
  //   { documents: usuario.documents },
  //   { new: true }
  // );

  // res.render("success");
};

module.exports = {
  changeMembershipController,
  showUploadFilesController,
  UploadFilesController,
};
