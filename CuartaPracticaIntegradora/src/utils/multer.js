const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      file.fieldname == "imagenperfil"
        ? `src/public/users/profiles`
        : file.fieldname == "imagenproducto"
        ? `src/public/users/products`
        : `src/public/users/documents`
    );
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${file.fieldname}-${file.originalname}`);
  },
});

const uploader = multer({
  storage,
});

module.exports = {
  uploader,
};
