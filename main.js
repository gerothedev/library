const myLibrary = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling", 
        genre: "Fantasy",
        pageCount: 223,
        read: false,
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"
    }, 
    {
        title: "The Shining",
        author: "Stephen King", 
        genre: "Gothic novel, Horror, Psychological horror",
        pageCount: 447,
        read: false,
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg"
    },
    {
        title: "The Lord Of The Rings",
        author: "J. R. R. Tolkien", 
        genre: "High fantasy, Adventure",
        pageCount: 1216,
        read: false,
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif"
    },
    {
        title: "Don Quixote",
        author: "Miguel de Cervantes", 
        genre: "Novel",
        pageCount: 1023,
        read: false,
        imgUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546112331i/3836.jpg"
    },
    {
        title: "Nineteen Eighty-Four",
        author: "George Orwell", 
        genre: "Dystopian, political fiction, social science fiction",
        pageCount: 328,
        read: false,
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg"
    },
    {
        title: "Moby Dick",
        author: "Herman Melville", 
        genre: "Adventure fiction, epic, sea story, encyclopedic novel",
        pageCount: 378,
        read: false,
        imgUrl: "https://m.media-amazon.com/images/I/51aV053NRjL.jpg"
    },
    {
        title: "The Divine Comedy",
        author: "Dante Alighieri", 
        genre: "Epic poetry",
        pageCount: 798,
        read: false,
        imgUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657540227i/6656.jpg"
    }
];
const main = document.querySelector("main");
const focusOnBook = document.querySelector(".focus-on-book");
const bookImg = document.querySelector(".focus-on-book > div:nth-child(1)");
const bookTitle = document.querySelector(".focus-on-book > div:nth-child(2) > div:nth-child(1) > p + p");
const bookAuthor = document.querySelector(".focus-on-book > div:nth-child(2) > div:nth-child(2) > p + p");
const bookGenre = document.querySelector(".focus-on-book > div:nth-child(2) > div:nth-child(3) > p + p");
const bookPageCount = document.querySelector(".focus-on-book > div:nth-child(2) > div:nth-child(4) > p + p");
const bookRead =  document.querySelector(".focus-on-book > div:nth-child(2) > div:nth-child(5) > p + input");
const focusOnBookRead = document.querySelector("#read-status");
const addBook = document.querySelector(".add-book");
const addBookDialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeBookInfo = document.querySelector(".close-book-info");
const deleteBookInfo = document.querySelector(".delete-book");
let selectedBook = null;

addBook.onclick = () => addBookDialog.showModal();
addBookButton.onclick = addBookToLibrary;
deleteBookInfo.onclick = removeFromLibrary;
closeBookInfo.onclick = hideBookInfo;
focusOnBookRead.onchange = changeBookStatus;

function Book(title = "Unknown", author = "Unknown", genre = "Unknown", pageCount = "Unknown", read = false, imgUrl) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.read = read;
  this.imgUrl = imgUrl;
}

function renderLibrary() {
    if (main.hasChildNodes()) {
        main.replaceChildren();
    }

    const section = document.createElement("section");
    if (myLibrary.length === 0) {
        const noBooks = document.createElement("p");
        noBooks.textContent = "No books in library";
        main.appendChild(section)
        section.appendChild(noBooks);
        return;
    }

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "slider"
    const label = document.createElement("label");
    const img = document.createElement("img");
    const noImgDiv = document.createElement("div");
    const pTag = document.createElement("p")
    let currentPosition = 0;

    main.appendChild(section)

    for (let i = 0; i < myLibrary.length; i++) {
        currentPosition++
        const inputClone = input.cloneNode();
        inputClone.id = `item-${currentPosition}`;
        section.appendChild(inputClone);
        if (i === myLibrary.length - 1) currentPosition = myLibrary.length + 1;
    }

    for (let i = myLibrary.length - 1; i >= 0; i--) {
        currentPosition--
        let finalElement = null;
        const labelClone = label.cloneNode();
        labelClone.setAttribute("for", `item-${currentPosition}`);
        labelClone.dataset.position = currentPosition;
        if (myLibrary[i].imgUrl === "unknown") {
            finalElement = noImgDiv.cloneNode()
            finalElement.appendChild(pTag.cloneNode())
            finalElement.querySelector("p").textContent = myLibrary[currentPosition - 1].title;
        } else {
            finalElement = img.cloneNode();
            finalElement.src = myLibrary[i].imgUrl;
        }
        section.appendChild(labelClone);
        labelClone.appendChild(finalElement);
        if (i === 0) currentPosition = 0;
    }
    bindSelectEvent();
}

function bindSelectEvent() {
    const books = document.querySelectorAll("[data-position]");
    books.forEach(book => {
        book.onclick = selectBook;
    })

    function selectBook(e) {
        let targetBook = e.target.closest("img") ? Number(e.target.parentElement.dataset.position) : Number(e.target.dataset.position);
        let position = myLibrary.length - targetBook;
        let nextBookSelection = (myLibrary.length - position) - 1;
        if (selectedBook !== null && selectedBook === nextBookSelection) {
            showBookInfo();
            return;
        }
        selectedBook = (myLibrary.length - position) - 1;
        books[position].style.setProperty("transform", `translatex(0) scale(1.25)`);
        let lessThanCount = 0;
        let greaterThanCount = 0;
        for (let i = position - 1; i >= 0; i--) {
            lessThanCount++;
            books[i].style.setProperty("transform", `translatex(calc(285px * ${lessThanCount}))`);
        }
        for (let i = position + 1; i < books.length; i++) {
            greaterThanCount++;
            books[i].style.setProperty("transform", `translatex(calc(-285px * ${greaterThanCount}))`);
        }
    }
}

function addBookToLibrary() {
  // do stuff here
  const bookInfo = [
    titleInput = document.querySelector("#title-input").value,
    authorInput = document.querySelector("#author-input").value,
    genreInput = document.querySelector("#genre-input").value,
    pageInput = document.querySelector("#page-input").value,
    readInput = document.querySelector("#read-input"),
    imgInput = document.querySelector("#book-cover-input").value
  ]

  bookInfo.forEach((info, index, array) => {
    if (array[index] === "") array[index] = "unknown";
  });

  myLibrary.push(new Book(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3], bookInfo[4].checked, bookInfo[5]));
  renderLibrary();

  bookInfo.forEach((info, index, array) => {
    if (info.checked === true || info.checked === false) {
        array[index].checked = false;
    } else {
        array[index] = "";
    }
  });
  selectNewBook()
}

function removeFromLibrary() {
    myLibrary.splice(selectedBook, 1);
    hideBookInfo();
    renderLibrary();
    if (myLibrary.length !== 0) selectNewBook(false);
}

function selectNewBook(bookAdded = true) {
    if (bookAdded === true) {
        selectedBook = 0;
    } else {
        selectedBook = (myLibrary.length - selectedBook) - 1 < 0 ? (myLibrary.length - selectedBook) : (myLibrary.length - selectedBook) - 1;
    }
    const books = document.querySelectorAll("[data-position]");
    books[selectedBook].style.setProperty("transform", `translatex(0) scale(1.25)`);
    let lessThanCount = 0;
    let greaterThanCount = 0;
    for (let i = selectedBook - 1; i >= 0; i--) {
        lessThanCount++;
        books[i].style.setProperty("transform", `translatex(calc(285px * ${lessThanCount}))`);
    }
    for (let i = selectedBook + 1; i < books.length; i++) {
        greaterThanCount++;
        books[i].style.setProperty("transform", `translatex(calc(-285px * ${greaterThanCount}))`);
    }
    selectedBook = selectedBook !== 0 ? (myLibrary.length - selectedBook) - 1 : myLibrary.length - 1;
}

function showBookInfo() {
    if (bookImg.hasChildNodes()) bookImg.replaceChildren();
    const bookImgTag = document.createElement("img");
    const noImgDiv = document.createElement("div");
    const pTag = document.createElement("p")

    focusOnBook.classList.remove("hide");
    bookTitle.textContent = myLibrary[selectedBook].title;
    bookAuthor.textContent = myLibrary[selectedBook].author;
    bookGenre.textContent = myLibrary[selectedBook].genre;
    bookPageCount.textContent = myLibrary[selectedBook].pageCount;
    bookRead.checked = myLibrary[selectedBook].read;
    if (myLibrary[selectedBook].imgUrl === "unknown") {
        pTag.textContent = myLibrary[selectedBook].title;
        bookImg.appendChild(noImgDiv);
        noImgDiv.appendChild(pTag)
    } else {
        bookImgTag.src = myLibrary[selectedBook].imgUrl;
        bookImg.appendChild(bookImgTag);
    }
}

function hideBookInfo() {
    focusOnBook.classList.add("hide");
    bookTitle.textContent = "";
    bookAuthor.textContent = "";
    bookGenre.textContent = "";
    bookPageCount.textContent = "";
    bookRead.textContent = "";
    bookImg.src = "";
}

function changeBookStatus() {
    let read = focusOnBookRead.checked === true ? true : false;
    myLibrary[selectedBook].read = read;
}

renderLibrary()