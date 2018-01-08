//Import packages
const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser");
const path = require('path')
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
const models = require('./models');

//Static address 'public'
app.use('/', express.static(path.join(__dirname, 'public')));
//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Set handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/hackerNews", {});

app.get("/", function (req, res) {
  res.render("index");
});

//Listen for requests
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
});
