const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/musicians", require("../routes/musicians"));

const port = 3000;

module.exports = app;
