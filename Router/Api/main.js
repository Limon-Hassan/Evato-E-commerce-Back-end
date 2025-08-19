let express = require('express');
let router = express.Router();
let user = require('./user');

router.use('/user', user);

module.exports = router;
