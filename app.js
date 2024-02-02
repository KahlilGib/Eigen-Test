const express = require('express');
const {Book, Member} = require("./models")


const app = express();
app.use(express.json());

async function checkBorrowConditions(memberCode, bookCode) {
    const member = await Member.findByPk(memberCode);
    const book = await Book.findByPk(bookCode);

    if (member.borrowedBooks.length >= 2) {
        throw new Error('Member may not borrow more than 2 books');
    }

    if (member.borrowedBooks.includes(bookCode)) {
        throw new Error('Borrowed books are not borrowed by other members');
    }

    if (book.stock === 0) {
        throw new Error('Book is currently not available');
    }
}

app.post('/borrow', async (req, res) => {
    const { memberCode, bookCode } = req.body;

    try {
        await checkBorrowConditions(memberCode, bookCode);

        await sequelize.transaction(async t => {
            await Book.update({ stock: sequelize.literal('stock - 1') }, { where: { code: bookCode } }, { transaction: t });
            await Member.update({ borrowedBooks: sequelize.fn('array_append', sequelize.col('borrowedBooks'), bookCode) }, { where: { code: memberCode } }, { transaction: t });
        });

        res.status(200).send('Book borrowed successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/return', async (req, res) => {
    const { memberCode, bookCode } = req.body;

    try {
        const member = await Member.findByPk(memberCode);

        if (!member.borrowedBooks.includes(bookCode)) {
            throw new Error('The returned book is not a book that the member has borrowed');
        }

        await sequelize.transaction(async t => {
            await Book.update({ stock: sequelize.literal('stock + 1') }, { where: { code: bookCode } }, { transaction: t });
            await Member.update({ borrowedBooks: sequelize.fn('array_remove', sequelize.col('borrowedBooks'), bookCode) }, { where: { code: memberCode } }, { transaction: t });
        });

        res.status(200).send('Book returned successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/check/book', async (req, res) => {
    const books = await Book.findAll();
    const availableBooks = books.filter(book => book.stock > 0);
    res.status(200).json(availableBooks);
});

app.get('/check/member', async (req, res) => {
    const members = await Member.findAll();
    res.status(200).json(members);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});