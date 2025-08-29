let express = require('express');
let path = require('path');
const multer = require('multer');
const { Createproducts } = require('../../AllController/productController');
let router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productPhoto');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueName + path.extname(file.originalname)
    );
  },
});
function fileFilter(req, file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpg, png, gif, svg)!'), false);
  }
}
const productPhoto = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter,
});

router.post('/Createproduct', productPhoto.array('photo', 12), Createproducts);
module.exports = router;
