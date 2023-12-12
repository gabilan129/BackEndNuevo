const { findUser, updateUser, updateLastConection } = require("../dao/mongo/users.mongo");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require("nodemailer");
const { createHash, isValidPassword } = require("../utils/bcrypts");


const forgotPasswordService = async (email) => {
  console.log("se ejectuta el srvicio");
  try {
    let user = await findUser(email);
    if (user) {
      //   console.log("Se encontro el usuario", user);
      const token = jwt.sign({ email }, "secretotokengeneracionclave", {
        expiresIn: "1h",
      });

      const transporter = nodemailer.createTransport({
        service: "Gmail", // Puedes utilizar otro proveedor de correo electrónico
        port: 587,
        auth: {
          user: "laurenticoderbackend@gmail.com",
          pass: "nosrarvgzfuqesnl",
        },
      });

      const resetLink = `http://localhost:${config.port}/auth/reset-password/${token}`;
      const mailOptions = {
        from: "Tienda Laurenti",
        to: email,
        subject: "Restablecer contraseña",
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}. Recuerda que el link es valido por 1 hora.`,
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return {
            status: "ERROR",
            message: error,
          };
        }
        console.log("Correo electrónico enviado:", info.response);
        res.status(200).json({ message: "Correo electrónico enviado" });
      });
      return {
        status: "OK",
        message: "Se envia mail a usuario",
        data: user,
      };
    } else {
      //   console.log("No se encontro el usuario");
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};

const postResetPasswordService = async (token, newPasssword) => {
  try {
    const decoded = jwt.verify(token, "secretotokengeneracionclave");

    const user = await findUser(decoded.email);

    if (!user) {
      return {
        status: "ERROR",
        message: "Usuario no encontrado",
      };
    }

    if(isValidPassword(user, newPasssword)){
      return {
        status: "ERROR",
        message: "La contraseña ya fue utilizada. Intente con otra contraseña.",
      };
    }

    const hashedPassword = await createHash(newPasssword);
    user.password = hashedPassword;
    const updatedUser = await updateUser(decoded.email, user);
    return {
      status: "OK",
      message: "Contraseña cambiada correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
};


const loginService = async (uid) =>{
  try {
    usuario = await updateLastConection(uid)
    return {
      status: "OK",
      message: "Ultima conexion actualizada correctamente",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error,
    };
  }
  


}

module.exports = {
  forgotPasswordService,
  postResetPasswordService,
  loginService
};
