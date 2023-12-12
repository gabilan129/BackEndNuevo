const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_conection: {
    type: String,
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
