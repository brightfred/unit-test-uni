// array to store the list of books
const bookCollection = [];

// function to add a book to the collection

function addBook() {
    const titleInput = document.getElementById('book-title');
    const authorInput = document.getElementById('book-author');
    const title = titleInput.value.trim();
    const author = authorInput.value.trim(); // Make sure to fetch the author

    if(title !== '' && author !== '') {
        const newBook = {
            id: Date.now(),
            title: title,
            author: author, // Add the author field here
            read: false
        };
        bookCollection.push(newBook);
        renderBooks();
        titleInput.value = '';
        authorInput.value = '';
    }
}

// function to toggle the read status of a book

function toggleBookStatus(id) {
    const book = bookCollection.find(book => book.id === id);
    if(book){
        book.read = !book.read; // toggle the read status
        renderBooks(); // render the updated list of books
    }
}

// function to delete a book from the collection

function deleteBook(id) {
    const bookIndex = bookCollection.findIndex(book => book.id === id);
    if(bookIndex > -1){
        bookCollection.splice(bookIndex, 1); // remove the book from the collection
        renderBooks(); // render the updated list of books
    }
}

// function to filter books based on read status

function filterBooks(status) {
    let filteredBooks = [];
    if(status === 'all') {
        filteredBooks = bookCollection;
    } else if(status === 'read') {
        filteredBooks = bookCollection.filter(book => book.read);
    } else if(status === 'unread') {
        filteredBooks = bookCollection.filter(book => !book.read);
    }

    renderBooks(status);
    return filteredBooks; 
}


// function to render the list of books
function renderBooks(filter = 'all') {
    const bookListElement = document.getElementById('book-list');
    bookListElement.innerHTML = '';

    let filteredBooks = [];
    if(filter === 'all'){
        filteredBooks = bookCollection;
    } else if(filter === 'read'){
        filteredBooks = bookCollection.filter(book => book.read);
    } else if(filter === 'unread'){
        filteredBooks = bookCollection.filter(book => !book.read);
    }

    filteredBooks.forEach(book => {
        const listItem = document.createElement('li');
        listItem.className = "book-item";
       listItem.innerHTML= `<span class="${book.read ? 'read' : ''}" onclick="toggleBookStatus(${book.id})">${book.title} by ${book.author}</span>
            <button onclick="deleteBook(${book.id})">Delete</button>`
        bookListElement.appendChild(listItem);
    });
}

if(typeof module !== 'undefined') {
    module.exports = {
        addBook,
        toggleBookStatus,
        deleteBook,
        filterBooks,
        bookCollection,
    };
}
