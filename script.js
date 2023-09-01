'use strict';
// Logic

const myLibrary = [];

function Book(title, author, year, haveRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.haveRead = Boolean(haveRead);
}

function addBookToLibrary(title, author, year, haveRead) {
    const book = new Book(title, author, year, haveRead);
    myLibrary.push(book);
}

function removeBook(i) {
    myLibrary.splice(i, 1);
}

// Render

function renderBookList() {
    const bookListElement = document.querySelector(".booklist");
    bookListElement.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        renderBook(i);
    }
}

function renderBook(i) {
    const bookListElement = document.querySelector(".booklist");
    const bookElement = document.createElement('li');
    bookElement.className = 'book';
    // Book id
    bookElement.dataset.key = i;
    // Book info
    const bookInfoElement = document.createElement('ul');
    // Book name
    const bookNameElement = document.createElement('li');
    bookNameElement.className = 'book_name';
    bookNameElement.textContent = myLibrary[i].title;
    // Remove button
    const bookReadButton = document.createElement('button');
    bookReadButton.className = 'book_read';
    bookReadButton.textContent = myLibrary[i].haveRead ? 'Unread' : 'Read';
    bookReadButton.addEventListener('click', readButtonHandler);
    // Book author
    const bookAuthorElement = document.createElement('li');
    bookAuthorElement.className = 'book_author';
    bookAuthorElement.textContent = myLibrary[i].author;
    // Book year
    const bookYearElement = document.createElement('li');
    bookYearElement.className = 'book_year';
    bookYearElement.textContent = myLibrary[i].year;
    // Read button
    const bookRemoveButton = document.createElement('button');
    bookRemoveButton.className = 'book_remove';
    bookRemoveButton.textContent = 'X';
    bookRemoveButton.addEventListener('click', removeBookHandler);
    // Assemble
    bookInfoElement.append(bookNameElement, bookRemoveButton, bookAuthorElement, bookYearElement, bookReadButton);
    bookElement.appendChild(bookInfoElement);
    bookListElement.appendChild(bookElement);
}

function openCreateDialog(event) {
    const createDialog = document.querySelector(".create-dialog");
    createDialog.show();
}

function closeCreateDialog(event) {
    const createDialog = document.querySelector(".create-dialog");
    createDialog.close();
}

function addBookHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    addBookToLibrary(title, author, year, false);
    renderBook(myLibrary.length - 1);
    closeCreateDialog();
}

function removeBookHandler(event) {
    const bookElement = event.target.parentElement.parentElement;
    const i = bookElement.dataset.key;
    removeBook(i);
    renderBookList();
}

function readButtonHandler(event) {
    const bookElement = event.target.parentElement.parentElement;
    const i = bookElement.dataset.key;
    toggleRead(i);
    renderBookList();
}

function toggleRead(i) {
    myLibrary[i].haveRead = !myLibrary[i].haveRead;
}

const createBookButton = document.querySelector(".create-book");
createBookButton.addEventListener('click', openCreateDialog);
const submitButton = document.querySelector(".create-dialog button");
submitButton.addEventListener('click', addBookHandler);
addBookToLibrary("Sputnik Sweetheart", "Haruki Murakami", 1999, false);
addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 1951, true);
renderBookList();