const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");
const band = require("../routes/bands");
const musicians = require("../routes/musicians");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/musicians", musicians);
app.use("/bands", band);


const port = 3000;

module.exports = app;
