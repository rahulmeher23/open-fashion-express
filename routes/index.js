// const router = require('../routes/routes')
// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const cors = require("cors");

import router from "./routes.js"
import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors"
import authRouter from "./auth.route.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const basePath = ""

app.use('/', router);
app.use(`${basePath}`, authRouter)
app.get('/', (req, res) => {res.json({message: "Welcome to Open Fashion Backend"})})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
