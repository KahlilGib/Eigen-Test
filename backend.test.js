const request = require('supertest');
const app = require('../app');

describe('POST /return', () => {
    let member;
    let book;

    beforeEach(async () => {
        member = await Member.create({ code: '12345', name: 'John Doe' });
        book = await Book.create({ code: '67890', title: 'Test Book', author: 'Test Author', stock: 1 });

        await member.addBook(book);
    });

    afterEach(async () => {
        await Book.destroy({ where: {} });
        await Member.destroy({ where: {} });
    });

    it('should return 200 and update the stock and borrowedBooks', async () => {
        const response = await request(app)
            .post('/return')
            .send({ memberCode: member.code, bookCode: book.code });

        expect(response.status).toBe(200);
        expect(response.body).toBe('Book returned successfully');

        const updatedMember = await Member.findByPk(member.code);
        const updatedBook = await Book.findByPk(book.code);

        expect(updatedMember.borrowedBooks).not.toContain(book.code);
        expect(updatedBook.stock).toBe(book.stock + 1);
    });

    it('should return 400 if the book is not borrowed by the member', async () => {
        const response = await request(app)
            .post('/return')
            .send({ memberCode: member.code, bookCode: '11111' });

        expect(response.status).toBe(400);
        expect(response.body).toBe('The returned book is not a book that the member has borrowed');
    });
});