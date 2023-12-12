const { updateUserById, findUserById } = require("../dao/mongo/users.mongo");
const User = require("../dao/mongo/models/userModel");

const changeMembershipService = async (uid, usuario) => {
  try {
    if (usuario.premium) {
      usuario.premium = false;
    } else {
      usuario.premium = true;
    }

    if (usuario.premium) {
      let usuario = await findUserById(uid);

      let identificacionencontrada;
      let domicilioencontrado;
      let estadocuentaencontrado;

      if (usuario.documents) {
        //Busco identificacion
        identificacionencontrada = usuario.documents.some(
          (documento) => documento.name == "identificacion"
        );
      }

      if (identificacionencontrada) {
        identificacionencontrada = true;
      } else {
        identificacionencontrada = false;
      }

      if (usuario.documents) {
        //Busco domicilio
        domicilioencontrado = usuario.documents.some(
          (documento) => documento.name == "domicilio"
        );
      }

      if (domicilioencontrado) {
        domicilioencontrado = true;
      } else {
        domicilioencontrado = false;
      }

      if (usuario.documents) {
        //Busco estadocuenta
        estadocuentaencontrado = usuario.documents.some(
          (documento) => documento.name == "estadocuenta"
        );
      }

      if (estadocuentaencontrado) {
        estadocuentaencontrado = true;
      } else {
        estadocuentaencontrado = false;
      }

      if (
        !identificacionencontrada ||
        !domicilioencontrado ||
        !estadocuentaencontrado
      ) {
        return {
          status: "ERROR",
          message:
            "No se puede actaulizar a membresia premium porque faltan cargar documentos necesarios. Verifique que documentos faltan.",
        };
      }
    }

    let user = await updateUserById(uid, usuario);

    return {
      status: "OK",
      message: "Se ha actualizado la membresia correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const showUploadFilesService = async (uid) => {
  try {
    let usuario = await findUserById(uid);

    let imagenperfilencontrada;
    let imagenproductoencontrada;
    let identificacionencontrada;
    let domicilioencontrado;
    let estadocuentaencontrado;

    if (usuario.documents) {
      //Busco imagen de perfil
      imagenperfilencontrada = usuario.documents.some(
        (documento) => documento.name == "imagenperfil"
      );
    }

    if (imagenperfilencontrada) {
      imagenperfilencontrada = true;
    } else {
      imagenperfilencontrada = false;
    }

    if (usuario.documents) {
      //Busco imagen de producto
      imagenproductoencontrada = usuario.documents.some(
        (documento) => documento.name == "imagenproducto"
      );
    }

    if (imagenproductoencontrada) {
      imagenproductoencontrada = true;
    } else {
      imagenproductoencontrada = false;
    }

    if (usuario.documents) {
      //Busco identificacion
      identificacionencontrada = usuario.documents.some(
        (documento) => documento.name == "identificacion"
      );
    }

    if (identificacionencontrada) {
      identificacionencontrada = true;
    } else {
      identificacionencontrada = false;
    }

    if (usuario.documents) {
      //Busco domicilio
      domicilioencontrado = usuario.documents.some(
        (documento) => documento.name == "domicilio"
      );
    }

    if (domicilioencontrado) {
      domicilioencontrado = true;
    } else {
      domicilioencontrado = false;
    }

    if (usuario.documents) {
      //Busco estadocuenta
      estadocuentaencontrado = usuario.documents.some(
        (documento) => documento.name == "estadocuenta"
      );
    }

    if (estadocuentaencontrado) {
      estadocuentaencontrado = true;
    } else {
      estadocuentaencontrado = false;
    }

    return {
      status: "OK",
      data: {
        uid: uid,
        imagenperfilencontrada: imagenperfilencontrada,
        imagenproductoencontrada: imagenproductoencontrada,
        identificacionencontrada: identificacionencontrada,
        domicilioencontrado: domicilioencontrado,
        estadocuentaencontrado: estadocuentaencontrado,
      },
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const uploadFilesService = async (uid, archivos) => {
  try {
    let archivosarray = [];

    if (archivos.imagenperfil) {
      let imagenperfil = {
        name: archivos.imagenperfil[0].fieldname,
        reference: archivos.imagenperfil[0].path,
      };
      archivosarray.push(imagenperfil);
    }

    if (archivos.imagenproducto) {
      let imagenproducto = {
        name: archivos.imagenproducto[0].fieldname,
        reference: archivos.imagenproducto[0].path,
      };
      archivosarray.push(imagenproducto);
    }

    if (archivos.identificacion) {
      let identificacion = {
        name: archivos.identificacion[0].fieldname,
        reference: archivos.identificacion[0].path,
      };
      archivosarray.push(identificacion);
    }

    if (archivos.domicilio) {
      let domicilio = {
        name: archivos.domicilio[0].fieldname,
        reference: archivos.domicilio[0].path,
      };
      archivosarray.push(domicilio);
    }

    if (archivos.estadocuenta) {
      let estadocuenta = {
        name: archivos.estadocuenta[0].fieldname,
        reference: archivos.estadocuenta[0].path,
      };
      archivosarray.push(estadocuenta);
    }

    let usuario = await findUserById(uid);

    if (usuario.documents) {
      usuario.documents = [...usuario.documents, ...archivosarray];
    } else {
      usuario.documents = archivosarray;
    }

    let usuarioActualizado = await User.findOneAndUpdate(
      { _id: uid },
      { documents: usuario.documents },
      { new: true }
    );

    return {
      status: "OK",
      message: "Se han subidos los archivos correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

module.exports = {
  changeMembershipService,
  showUploadFilesService,
  uploadFilesService,
};
