//Import packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Declare newsSchema
var newsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'title is required.',
    unique: true
  },
  link: {
    type: String,
    trim: true,
    required: 'link is required.'
  },
  notesId: [{
    title: String,
    comment: String
  }]
})
//Create news model
var News = mongoose.model("news", newsSchema);
//Export news model
module.exports = News;
