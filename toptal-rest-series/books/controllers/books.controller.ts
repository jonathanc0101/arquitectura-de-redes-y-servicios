import express from "express";
import booksService from "../services/books.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:books-controller");

class BooksController{
  async patch(req: express.Request, res: express.Response) {
    log(await booksService.patchById(req.body.bookId, req.body));
    res.status(204).send();
  }


  async getBookById(req: express.Request, res: express.Response) {
    const book = await booksService.readById(req.body.bookId);
    res.status(200).send(book);
  }

  async put(req: express.Request, res: express.Response) {
    const bookId = req.body.bookId;
    delete req.body.userId;
    delete req.body.bookId;
    log(await booksService.putById(bookId, req.body));
    res.status(204).send();
  }

  async removeBook(req: express.Request, res: express.Response) {
    log(await booksService.deleteById(req.body.id));
    res.status(204).send();
  }

async listBooks(req: express.Request, res: express.Response) {
    const books = await booksService.listBooks(req.body.userId)
    res.status(200).send(books);
  }

  async createBook(req: express.Request, res: express.Response) {
    req.body.user_id = req.body.userId;
    const bookId = await booksService.create(req.body);
    res.status(201).send({ id: bookId });
  }

}

export default new BooksController();
