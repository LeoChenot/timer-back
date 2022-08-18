require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/router');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

const pathToViews = path.resolve(`${__dirname}/app/views`);
app.set('views', pathToViews);

const pathToStaticDirectory = path.resolve(`${__dirname}/public`);
const allStaticFiles = express.static(pathToStaticDirectory);
app.use(allStaticFiles);

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});