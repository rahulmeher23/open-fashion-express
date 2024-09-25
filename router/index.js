const router = require('../routes/routes')
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);
app.get('/', (req, res) => {res.json({message: "Welcome to Open Fashion Backend"})})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
