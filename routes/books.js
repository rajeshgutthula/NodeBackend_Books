const express = require('express');
const router = express.Router();
const { addBooks,getBookById,getAllBooks} = require('../controllers/bookController');


router.post('/add', addBooks);
router.get('/:id', getBookById);
router.get('/', getAllBooks);

module.exports = router;
