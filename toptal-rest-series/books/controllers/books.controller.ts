import express from "express";
import booksService from "../services/books.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:books-controller");

class BooksController{

async listBooks(req: express.Request, res: express.Response) {
    const books = await booksService.listBooks(req.body.id)
    res.status(200).send(books);
  }

  async createBook(req: express.Request, res: express.Response) {
    log(await booksService.putById(req.body.id, req.body));
    res.status(204).send();
  }

}

export default new BooksController();
