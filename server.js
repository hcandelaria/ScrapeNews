//Import packages
const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const app = express();
const request = require('request');
const router = express.Router();
const models = require('./models');
const db = require("./models");
const cheerio = require('cheerio');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hackerNews";
const PORT = process.env.PORT || 8080;

//Static address 'public'
app.use('/', express.static(path.join(__dirname, 'public')));

//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {});

//ROUTES
app.get('/articles', function (req, res) {
  //Get all news
  db.News.find({}).then(function(dbNews) {
    res.render('articles', dbNews);
  }).catch(function(err){
    res.json(err);
  });
});

//Scrape route
app.get('/', function(req, res) {
  request("https://news.ycombinator.com/", function(error, response, html) {
    let $ = cheerio.load(html);
    var newsArray = [];


    $('tr.athing').each( (i,element) => {
      //news Object
      let news = {};
      news.link = $(element).children('.title').children('.storylink').attr('href');
      news.title = $(element).children('.title').children('.storylink').text();
      newsArray.push(news);
    });

    newsArray = newsArray.slice(0,10);
    console.log(newsArray);
    res.render('index', newsArray);
  });
});
app.post('/news', function (req,res){
  db.News.create(req.body)
  .then( function(dbNews){
    res.json(dbNews);
  }).catch(function (err){
    res.json(err);
  })
});
app.post('/notes/:id', function (req,res) {
  db.Notes
    .create(req.body)
    .then( function(dbNotes){
      return db.News.findByIdAndUpdate(req.params.id,{ $push: {notesId: dbNotes._id }}, {new:true});
    }).then(function(dbNotes) {
      res.json(dbNotes);
    }).catch(function(err){
      res.json(err);
    });
});
app.delete('/news/:id', function (req,res) {
  db.News.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.send(err);
    else res.json({ message: 'News Deleted!'});
  });
});
app.delete('/notes', function (req, res){

});
//Listen for requests
app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});
