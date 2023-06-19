import express from 'express';
import booksService from '../services/books.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:books-controller');
class BooksMiddleware {
    async validateBookExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const book = await booksService.readById(req.params.bookId);
        if (book) {
            res.locals.book = book;
            next();
        } else {
            res.status(404).send({
                error: `Book ${req.params.bookId} not found`,
            });
        }
    }

    async extractBookId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.bookId = req.params.bookId;
        next();
    }
}

export default new BooksMiddleware();
