let express = require('express');
let router = express.Router();
const { registation, login } = require('../../AllController/AuthController');

router.post('/registation', registation);
router.post('/login', login);

module.exports = router;
