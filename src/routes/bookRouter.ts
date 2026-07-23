// path: ./src/routes/bookRouter.ts
import express from "express"
import { displayBooks, insertBook, updateBook, deleteBook } from "../controllers/bookController";
import {validatePostBook, validatePatchBook, validateDeleteBook} from "../middleware/validateBook";
const router = express.Router();

router.get('/', displayBooks);
router.post('/', validatePostBook, insertBook);
router.patch('/:id', validatePatchBook, updateBook) // I want to make a new req property for example: req.toBeUpdated and set it to the returned object of
router.delete('/:id', validateDeleteBook, deleteBook)

export default router;