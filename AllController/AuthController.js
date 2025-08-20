const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');

async function registation(req, res) {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send('Please Enter all the fields !');
  }
  let existingUser = await userSchema.findOne({ email });
  if (existingUser) {
    res.send({ msg: 'Email Already Exists !' });
  }
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      let Users = new userSchema({
        name,
        email,
        password: hash,
      });
      await Users.save();
      res
        .status(201)
        .send({ msg: 'User Registation succesfull !', data: Users });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Internal server Error !' });
  }
}
function login(req, res) {
  res.send('req.body');
}

module.exports = { registation, login };
