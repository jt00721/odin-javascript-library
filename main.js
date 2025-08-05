const myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
  // take params, create a book then store it in the array
  let book = new Book(title, author, pages, hasBeenRead);

  myLibrary.push(book);
}