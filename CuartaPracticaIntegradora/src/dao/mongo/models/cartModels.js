const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  productos: {
    type: [
      {
        pid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        cantidad: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
});

const carts = mongoose.model("carts", cartSchema);
module.exports = carts;
