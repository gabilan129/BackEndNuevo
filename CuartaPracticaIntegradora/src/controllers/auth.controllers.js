const {
  forgotPasswordService,
  postResetPasswordService,
  loginService
} = require("../services/auth.services");

const loginController = async (req, res) => {
    respuesta = await loginService(req.user._id)
    if(respuesta.status == "OK"){
    req.logger.info("Usuario autenticado correctamente.");
    res.status(200).redirect("/");
    }else{
      res.status(500).render("error", {data: respuesta.message})
    }
};


const showLoginController = (req, res) => {
  res.status(200).render("login", {});
};

const registerController = (req, res) => {
  res.status(200).render("register", {});
};

const getForgotPasswordController = (req, res) => {
  res.status(200).render("forgotpassword", {});
};

const logoutController = async (req, res) => {
  respuesta = await loginService(req.user._id)
    if(respuesta.status == "OK"){
    }else{
      res.status(500).render("error", {data: respuesta.message})
    }
  req.session.destroy((err) => {
    if (err) res.send("Failed Logout");
    res.status(400).redirect("/auth/login");
    req.logger.info("Usuario deslogueado correctamente");
  });
};

const failedRegisterController = (req, res) => {
  res.status(400).send("Fallo el registro");
};

const roleErrorController = (req, res) => {
  res.status(401).render("roleerror", {});
};

const forgotPasswordController = async (req, res) => {
  const email = req.body.email;
  respuesta = await forgotPasswordService(email);
  if (respuesta.status == "OK") {
    if (respuesta.data) {
      res.status(200).render("success", {
        data: `Se ha enviado un email a ${respuesta.data.username} con las instrucciones para restrablecer su contraseña`,
      });
    } else {
      res
        .status(400)
        .render("error", { data: "No se ha encontrado el usuario ingresado" });
    }
  } else {
    req.logger.error(`Error al eliminar producto: ${respuesta.message}`);
    res.status(500).send({ status: "ERROR", message: "Server Error" });
  }
};

const getResetPasswordController = async (req, res) => {
  const { token } = req.params;
  res.status(200).render("resetpassword", { data: token });
};

const postResetPasswordController = async (req, res) => {
  const { token, newpassword } = req.body;
  const respuesta = await postResetPasswordService(token, newpassword);

  if (respuesta.status == "OK") {
    res.status(200).render("success", { data: respuesta.message });
  } else {
    req.logger.error(`Error al cambiar la contraseña: ${respuesta.message}`);
    if (respuesta.message.toString().includes("jwt expired")) {
      respuesta.message =
        "El token ya expiró. Vuelva a solicitar un nuevo toquen para restablecer su contrasña";
    }
    res.status(500).render("error", { data: respuesta.message });
  }
};

module.exports = {
  showLoginController,
  loginController,
  registerController,
  logoutController,
  roleErrorController,
  failedRegisterController,
  getForgotPasswordController,
  forgotPasswordController,
  getResetPasswordController,
  postResetPasswordController,
};
