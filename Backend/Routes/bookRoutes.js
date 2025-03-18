const express = require('express');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../Controllers/bookControllers');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
