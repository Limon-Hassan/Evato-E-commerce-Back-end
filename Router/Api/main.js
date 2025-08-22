let express = require('express');
let router = express.Router();
let user = require('./user');
let product = require('./product');

router.use('/user', user);
router.use('/product', product);

module.exports = router;
