//Import packages
const cheerio = require('cheerio');
const request = require("request");

//newsWebsite
const newsWebsite = ("")

//Making request to newsWebsite
request(newsWebsite, (err res, html) =>{
  let $ = cheerio.load(html);
});
