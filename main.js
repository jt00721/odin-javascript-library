const myLibrary = [];
const table = document.querySelector("#allBooksTable");
const tableBody = document.getElementById("tableBody");
const addNewBookButton = document.querySelector("#addNewBookButton");
const addNewBookDialog = document.querySelector("#addNewBookDialog");
const closeBtn = document.querySelector("#closeBtn");
const addBookBtn = document.querySelector("#addBookBtn");

class Book {
    constructor(title, author, pages, hasBeenRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasBeenRead = hasBeenRead;
    }

    updateReadStatus() {
        if (this.hasBeenRead == true) {
            this.hasBeenRead = false;
        } else {
            this.hasBeenRead = true;
        }
    }
}

class Library {
    books = [];

    addBookToLibrary(title, author, pages, hasBeenRead) {
        let book = new Book(title, author, pages, hasBeenRead);
        this.books.push(book);
    }

    removeBookFromLibrary(id) {
        this.books.forEach(element => {
            if (element.id == id) {
                let index = this.books.indexOf(element);
                if (index > -1) {
                    this.books.splice(index, 1);
                }
            }
        })
    }

    updateReadStatus(id) {
        this.books.forEach(element => {
            if (element.id == id) {
                element.updateReadStatus();
            }
        })
    }
}

addNewBookButton.addEventListener("click", () => {
    addNewBookDialog.showModal();
});

closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addNewBookDialog.close();
});

function showAllBooks(library) {
    var newTbody = document.createElement('tbody');
    table.replaceChild(newTbody, table.childNodes[3]);
    newTbody.setAttribute("id", "tableBody");

    library.books.forEach(element => {
        console.log(element);
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let pages = document.createElement("td");
        let hasBeenRead = document.createElement("td");
        let removeBtn = document.createElement("button");
        let updateReadStatusBtn = document.createElement("button");

        removeBtn.type = "button";
        updateReadStatusBtn.type = "button";

        removeBtn.dataset.bookId = element.id
        updateReadStatusBtn.dataset.bookId = element.id

        removeBtn.addEventListener("click", () => {
            removeBook(removeBtn.dataset.bookId, library);
        });

        updateReadStatusBtn.addEventListener("click", () => {
            updateBookReadStatus(updateReadStatusBtn.dataset.bookId, library)
        })

        id.append(element.id);
        title.append(element.title);
        author.append(element.author);
        pages.append(element.pages);
        hasBeenRead.append(element.hasBeenRead);
        removeBtn.append("Remove");
        updateReadStatusBtn.append("Change Read Status");

        row.append(id, title, author, pages, hasBeenRead, removeBtn, updateReadStatusBtn);
        newTbody.appendChild(row);
    });
}

function addNewBookForm(library) {
    let titleValue = document.querySelector("#titleInput").value;
    let authorValue = document.querySelector("#authorInput").value;
    let pagesValue = document.querySelector("#pagesInput").value;
    let hasBeenReadValue = document.querySelector("#hasBeenReadInput").value;

    if (hasBeenReadValue == "on") {
        hasBeenReadValue = true;
    }

    console.log(hasBeenReadValue);
    library.addBookToLibrary(titleValue, authorValue, pagesValue, hasBeenReadValue);
    addNewBookDialog.close();
    showAllBooks(library);
}

function removeBook(id, library) {
    library.removeBookFromLibrary(id);
    showAllBooks(library);
}

function updateBookReadStatus(id, library) {
    library.updateReadStatus(id);
    showAllBooks(library);
}

let lib = new Library();
lib.addBookToLibrary('Harry Potter', 'J.K Rowlings', 350, true);
lib.addBookToLibrary('Ali', 'Faroo', 324, true);
lib.addBookToLibrary('Harry Potter', 'J.K Rowlings', 350, true);
showAllBooks(lib);
addBookBtn.addEventListener("click", () => {
    addNewBookForm(lib)
})