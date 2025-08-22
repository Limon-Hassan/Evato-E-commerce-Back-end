const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
async function Adminregistation(req, res) {
  let { name, email, password, Roll } = req.body;

  if (!name || !email || !password || !Roll) {
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
        Roll,
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
async function login(req, res) {
  let { email, password, Roll } = req.body;
  let existingUser = await userSchema.findOne({ email });
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result === true) {
        const payload = {
          id: existingUser._id,
          email: existingUser.email,
          Role: existingUser.Roll,
        };
        var token = jwt.sign({ payload }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        res.cookie(
          existingUser.Roll === 'admin' ? 'adminToken' : 'userToken',
          token,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000,
          }
        );

        return res.status(200).send({
          token: token,
          msg:
            existingUser.Roll === 'admin'
              ? 'Admin Login Successfull !'
              : 'User Login Sucessfull !',
          role: existingUser.Roll,
        });
      } else {
        return res.status(404).send({ msg: 'Invaild Password !' });
      }
    });
  } else {
    return res.send('ai email a kono user nai');
  }
}
async function alluser(req, res) {
  if (req.user.Role === 'user') {
    userInfo = await userSchema
      .findOne({ _id: req.user.id })
      .select('-password');
    res.send({ user: userInfo });
  } else {
    return res
      .status(401)
      .send({ msg: 'Token expired or invalid. Please log in again.' });
  }
}
async function adminUsers(req, res) {
  try {
    if (req.user.Role === 'admin') {
      let users = await userSchema.find({ Roll: 'user' }).select('-password');

      return res.send(users);
    } else {
      return res
        .status(401)
        .send({ msg: 'Unauthorized: Only admin can access this.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: 'Server error' });
  }
}

module.exports = { registation, Adminregistation, login, alluser, adminUsers };
