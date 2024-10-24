// test/ for the book collection

// import the functions to be tested and the book collection
const { addBook, toggleBookStatus, deleteBook, filterBooks, bookCollection } = require('../src/test_3/script');

describe('Book Manager', () => {
    beforeEach(() => {
        bookCollection.length = 0;

        // Mock DOM elements for title and author inputs
        document.body.innerHTML =
            `<input id="book-title" value="Book1" />
             <input id="book-author" value="Author1" />
             <ul id="book-list"></ul>`;
    });

    test('Add a new book', () => {
        addBook();
        expect(bookCollection.length).toBe(1);
        expect(bookCollection[0].title).toBe('Book1');
        expect(bookCollection[0].author).toBe('Author1'); 
        expect(bookCollection[0].read).toBe(false);
    });

    test('Toggle the read/unread status of a book', () => {
        addBook();
        toggleBookStatus(bookCollection[0].id);
        expect(bookCollection[0].read).toBe(true);
    });

    test('Toggle the read/unread status of a book twice', () => {
        addBook();
        toggleBookStatus(bookCollection[0].id);
        toggleBookStatus(bookCollection[0].id);
        expect(bookCollection[0].read).toBe(false);
    });

    test('Delete a book', () => {
        addBook();
        deleteBook(bookCollection[0].id);
        expect(bookCollection.length).toBe(0);
    });

    test('Filter books based on read status', () => {
        addBook();
        document.getElementById('book-title').value = 'Book2';
        document.getElementById('book-author').value = 'Author2';
        addBook();
        toggleBookStatus(bookCollection[0].id);
        const filteredBooks = filterBooks('read'); 
        expect(filteredBooks.length).toBe(1);
        expect(filteredBooks[0].title).toBe('Book1');
    });
});
