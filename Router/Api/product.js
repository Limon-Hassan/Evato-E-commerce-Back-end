let express = require('express');
const { productAdd } = require('../../AllController/productController');
let router = express.Router();

router.post('/AddProduct', productAdd);
module.exports = router;