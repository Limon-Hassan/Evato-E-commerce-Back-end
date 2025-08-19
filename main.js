let express = require('express');
require('dotenv').config();
const router = require('./Router/main');
const dbConnection = require('./Config/dbconfig');
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
dbConnection();
let PORT = process.env.MY_SERVER_PORT || 5990;
app.listen(PORT, () => {
  console.log('Server Is Ready ! ' + PORT);
});
