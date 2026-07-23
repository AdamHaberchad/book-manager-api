import Joi from "joi";
import { Book, UpdateBookBody } from "../types/bookType";
import books from "../data/books";
import { NextFunction, Request, Response } from "express";

const schema = Joi.object({
    title: Joi.string().required(),
});

function validateBookInput(book: Book){
    const {error, value} = schema.validate(book);

    if(error){
        console.log("----->validateBookInput: invalid Input");
        return {
            isValid: null,
            error: error
        }
    }else{
        console.log("----->validateBookInput: Valid Input");
        return{
            isValid: value,
            error: null
        }
    }
}

function getBookById(bookID: number){
    const book = books.find( b => b.id === bookID);
    if(book){
        console.log("----->getBookById: book exists!");
        return book;
    }else{
        console.log("----->getBookById: book doesn't exists!");
        return null;
    }
}

function getBookByTitle(bookTitle: string){
    const book = books.find( b => b.title === bookTitle);
    if(book){
        console.log("----->getBookByTitle: book exists!");
        return book;
    }else{
        console.log("----->getBookByTitle: book doesn't exists!");
        return null;
    }
};


//===============middleware===============

function validatePostBook(req: Request, res: Response, next:NextFunction){
    const input = validateBookInput(req.body);
    if(input.error) return res.status(400).send(`Invalid Input: ${input.error}`);
    
    const book = getBookByTitle(req.body.title);  //I wanna make the book constant accept two either null or the actual book object just like in the return
    // I am using the title here because when we wanna post the book hasen't been registered to get an id that we can use to compare
    if(book === null){
        console.log("----->validatePostBook: Post Validation done successfully!");
        next();
    }else{
        console.log("----->validatePostBook: Post Validation faild!");
        return res.status(400).send(`Book with the title: ${book.title} already exists`);
    }
    
};

function validatePatchBook(req:Request, res:Response, next:NextFunction){
    const book = getBookById(Number(req.params.id));
    if(book === null){
        console.log("----->validatePatchBook: Patch Validation faild!");
        return res.status(400).send(`Book with ID: ${req.params.id} doesn't exists`);
    }else{
        req.book = book;
        console.log("----->validatePatchBook: Patch Validation done successfully!");
        next();
    }
}

function validateDeleteBook(req:Request, res:Response, next:NextFunction){
    const book = getBookById(Number(req.params.id));
    if(book === null){
        console.log("----->validateDeleteBook: Delete Validation faild!");
        return res.status(400).send(`Book with ID: ${req.params.id} doesn't exists`);
    }else{
        req.book = book;
        console.log("----->validateDeleteBook: Delete Validation done successfully!");
        next();
    }
}

export {validatePostBook, validatePatchBook, validateDeleteBook}