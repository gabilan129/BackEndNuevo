const UserDTO = require("../dao/dto/session.dto");

const showCurrentSessionController = (req, res) => {
  const userDTO = new UserDTO(req.user);
  let data = {
    session: userDTO,
  };
  res.render("sessions", data);
};

module.exports = {
  showCurrentSessionController,
};
