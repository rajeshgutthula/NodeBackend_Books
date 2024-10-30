const Book = require('../models/Book');

const addBooks = async (req, res) => {
  const booksData = req.body;  // Expecting the book data array in the request body

  try {
    const insertedBooks = await Book.insertMany(booksData, { ordered: true });
    res.status(201).json({
      message: "Books inserted successfully",
      insertedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to insert books", error });
  }
};


const getBookById = async (req, res) => {
  const { id } = req.params;  // Get the book id from URL parameters

  try {
    const book = await Book.findOne({ id });  // Find the book by id
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve book", error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();  // Fetches all books from the collection
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error });
  }
};

module.exports = { addBooks,getBookById,getAllBooks};
