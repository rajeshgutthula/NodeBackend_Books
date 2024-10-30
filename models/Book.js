const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  cover_pic:{type:String,required:true},
  title: { type: String, required: true },
  read_status: { type: String, required: true },
  rating: { type: Number, required: true },
  author_name: { type: String, required: true },
  // add other fields if necessary
});

module.exports = mongoose.model('Book', bookSchema);
