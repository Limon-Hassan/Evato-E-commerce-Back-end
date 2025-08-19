const userSchema = require('../Model/userSchema');

async function registation(req, res) {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send('Please Enter all the fields !');
  }
  try {
    let Users = new userSchema({
      name,
      email,
      password,
    });
    await Users.save();
    res.status(201).send({ msg: 'User Registation succesfull !' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Internal server Error !' });
  }
}
function login(req, res) {
  res.send('req.body');
}

module.exports = { registation, login };
