//Import packages
const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser");
const path = require('path')
const port = process.env.PORT || 8000;
const app = express();
const cheerio = require('cheerio')

//Import routes
import routes from ('./routes');

//Static address 'public'
app.use('/', express.static(path.join(__dirname, 'public')));

//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', routes);

// listens for requests
app.listen(port, function() {
    console.log("Listening on PORT " + port);
});
