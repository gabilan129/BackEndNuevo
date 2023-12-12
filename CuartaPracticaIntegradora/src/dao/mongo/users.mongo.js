const User = require("./models/userModel");

const findUser = async (usuario) => {
  try {
    return await User.findOne({ username: usuario }).lean();
  } catch (error) {
    throw error;
  }
};

const findUserById = async (uid) => {
  try {
    return await User.findOne({ _id: uid }).lean();
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (email, user) => {
  try {
    return await User.updateOne({ username: email }, user);
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (uid, user) => {
  try {
    return await User.updateOne({ _id: uid }, user);
  } catch (error) {
    throw error;
  }
};

const updateLastConection = async (uid) => {
  try {
    const currentTime = new Date(); // Obtén la fecha y hora actual

    return await User.findOneAndUpdate(
      { _id: uid },
      { last_conection: currentTime },
      { new: true } // Esto devuelve el documento actualizado
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUser,
  findUserById,
  createUser,
  updateUser,
  updateUserById,
  updateLastConection,
};
