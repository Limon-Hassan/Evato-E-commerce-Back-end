let express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const router = require('./Router/main');
const dbConnection = require('./Config/dbconfig');
let app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.static('productPhoto'));
app.use(router);
dbConnection();
app.get('/', (req, res) => {
  res.send('Hello World !');
});
let PORT = process.env.MY_SERVER_PORT || 5990;
app.listen(PORT, () => {
  console.log('Server Is Ready ! ' + PORT);
});
