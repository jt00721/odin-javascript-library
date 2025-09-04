const myLibrary = [];
const table = document.querySelector("#allBooksTable");
const tableBody = document.getElementById("tableBody");
const addNewBookButton = document.querySelector("#addNewBookButton");
const addNewBookDialog = document.querySelector("#addNewBookDialog");
const closeBtn = document.querySelector("#closeBtn");

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

addNewBookButton.addEventListener("click", () => {
    addNewBookDialog.showModal();
});

closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addNewBookDialog.close();
});

// function Book(title, author, pages, hasBeenRead) {
//     this.id = crypto.randomUUID();
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.hasBeenRead = hasBeenRead;
// }

// Book.prototype.updateReadStatus = function () {
//     if (this.hasBeenRead == true) {
//         this.hasBeenRead = false;
//     } else {
//         this.hasBeenRead = true;
//     }
// };

function addBookToLibrary(title, author, pages, hasBeenRead) {
    let book = new Book(title, author, pages, hasBeenRead);

    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    myLibrary.forEach(element => {
        if (element.id == id) {
            let index = myLibrary.indexOf(element);
            if (index > -1) {
                myLibrary.splice(index, 1);
            }
        }
    })
}

function updateReadStatus(id) {
    myLibrary.forEach(element => {
        if (element.id == id) {
            element.updateReadStatus();
        }
    })
}

function showAllBooks() {
    var newTbody = document.createElement('tbody');
    table.replaceChild(newTbody, table.childNodes[3]);
    newTbody.setAttribute("id", "tableBody");

    myLibrary.forEach(element => {
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
            removeBook(removeBtn.dataset.bookId);
        });

        updateReadStatusBtn.addEventListener("click", () => {
            updateBookReadStatus(updateReadStatusBtn.dataset.bookId)
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

function addNewBookForm() {
    let titleValue = document.querySelector("#titleInput").value;
    let authorValue = document.querySelector("#authorInput").value;
    let pagesValue = document.querySelector("#pagesInput").value;
    let hasBeenReadValue = document.querySelector("#hasBeenReadInput").value;

    if (hasBeenReadValue == "on") {
        hasBeenReadValue = true;
    }

    console.log(hasBeenReadValue);
    addBookToLibrary(titleValue, authorValue, pagesValue, hasBeenReadValue);
    addNewBookDialog.close();
    showAllBooks();
}

function removeBook(id) {
    removeBookFromLibrary(id);
    showAllBooks();
}

function updateBookReadStatus(id) {
    updateReadStatus(id);
    showAllBooks();
}

addBookToLibrary('Harry Potter', 'J.K Rowlings', 350, true);
addBookToLibrary('Ali', 'Faroo', 324, true);
addBookToLibrary('Harry Potter', 'J.K Rowlings', 350, true);
showAllBooks();