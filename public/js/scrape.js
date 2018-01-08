//Import packages
const cheerio = require('cheerio');
const request = require("request");
//Declaring newsWebsite
const newsWebsite = ("https://news.ycombinator.com/")
//function making request to newsWebsite
const scrapeNews = request(newsWebsite, (err, res, html) => {
  //Declare var
  let newsArray = [];
  let $ = cheerio.load(html);
  //Cheerio scrape function to get each tr with the class athing
  $('tr.athing').each( (i,element) => {
    let link = $(element).children('.title').children('.storylink').attr('href');
    let title = $(element).children('.title').children('.storylink').text();
    //make a object with the news info and push to newsArray
    newsArray.push({
      title: title,
      link: link
    });
  });
  //Test
  //console.log(newsArray);
});
//Export scrapeNews function
module.exports = scrapeNews;
