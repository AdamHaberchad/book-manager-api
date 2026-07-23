// path: ./src/controllers/bookController.ts
import type { Request, Response } from "express";
import { Book, UpdateBookBody } from "../types/bookType";
import books from "../data/books";
import { func } from "joi";



//normally it is an async function but we are using an array so it don't really matter
function displayBooks(req: Request, res: Response){
    res.json(books);
}

function insertBook(req: Request, res: Response){
    const newBook:Book = req.body;
    newBook.id = books.length;
    newBook.releaseDate = new Date();
    newBook.available = true;
    books.push(newBook); 
    res.json(books);
}

function updateBook(req: Request, res: Response){
    const updates:UpdateBookBody = req.body;
    try{
        Object.assign(req.book!, updates);
        res.json(req.book);
    }catch(error: Error | any){
        res.status(400).send(`Something went wrong: ${error.message}`);
    }
}

function deleteBook(req: Request, res: Response){
    const index = books.indexOf(req.book!); //trust me bro :')
    books.splice(index, 1);
    res.send(books);

}

export {displayBooks, insertBook, updateBook, deleteBook};