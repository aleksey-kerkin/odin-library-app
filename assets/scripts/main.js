const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "read already" : "not read yet"
    }`;
  };
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
}