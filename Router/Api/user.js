let express = require('express');
let router = express.Router();
const {
  registation,
  login,
  Adminregistation,
  alluser,
  adminUsers,
} = require('../../AllController/AuthController');
const authMidleware = require('../../Midleware/authMidleware');
const AdminMidleware = require('../../Midleware/AdminMidleware');

router.post('/registation', registation);
router.post('/Adminregistation', Adminregistation);
router.post('/login', login);
router.get('/users', authMidleware, alluser);
router.get('/adminusers', AdminMidleware, adminUsers);

module.exports = router;
