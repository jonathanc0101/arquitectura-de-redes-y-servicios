import BooksDao from '../daos/books.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateBookDto } from '../dto/create.book.dto';
import { PutBookDto } from '../dto/put.book.dto';
import { PatchBookDto } from '../dto/patch.book.dto';

class BooksService implements CRUD {
    async create(resource: CreateBookDto) {
        return BooksDao.addBook(resource);
    }

    async deleteById(id: string) {
        return BooksDao.removeBookById(id);
    }

    async list(limit: number, page: number) {
        return BooksDao.getBooks();
    }

    async patchById(id: string, resource: PatchBookDto): Promise<any> {
        return BooksDao.patchBookById(id, resource);
    }

    async putById(id: string, resource: PutBookDto): Promise<any> {
        return BooksDao.putBookById(id, resource);
    }

    async readById(id: string) {
        return BooksDao.getBookById(id);
    }

    async listBooks(id: string){
        return BooksDao.getUserBooks(id);
    }
}

export default new BooksService();
