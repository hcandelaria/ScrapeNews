//Import packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Declare notesSchema
var notesSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'title is required.'
  },
  comment: {
    type: String,
    trim: true,
    require: 'Comment is required.'
  }
});
//Create notes model
var Notes = mongoose.model('notes',notesSchema);
//Export notes model
module.exports = Notes;
