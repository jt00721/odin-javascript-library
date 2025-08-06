const myLibrary = [];
const table = document.querySelector("#allBooksTable");

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

function showAllBooks() {
    myLibrary.forEach(element => {
        console.log(element);
        // create a row in the table
        // append a td element to the row
        // populate each td textContent with the corresponding field of the element
        // let row = document.createElement("tr")
        //     .append(
        //         document.createElement("td").append(element.id),
        //         document.createElement("td").append(element.title), 
        //         document.createElement("td").append(element.author), 
        //         document.createElement("td").append(element.pages), 
        //         document.createElement("td").append(element.hasBeenRead));
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let pages = document.createElement("td");
        let hasBeenRead = document.createElement("td");

        id.append(element.id);
        title.append(element.title);
        author.append(element.author);
        pages.append(element.pages);
        hasBeenRead.append(element.hasBeenRead);

        row.append(id, title, author, pages, hasBeenRead)
        table.appendChild(row);
    });
}

addBookToLibrary('Harry Potter', 'J.K Rowlings', 350, true);
addBookToLibrary('Ali', 'Faroo', 324, true);
addBookToLibrary('Harry Potter', 'J.K Rowlings', 350, true);
showAllBooks();