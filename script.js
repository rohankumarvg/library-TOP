// Book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    if (this.read) {
      return `${this.title} by ${this.author}, ${this.pages} pages read already`;
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages not read yet`;
    }
  }
}

// Player class
class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  sayName() {
    console.log(this.name);
  }
}

// Library array
const myLibrary = [];

// Add book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBooks();
}

// Create a new book from form data
function createBook(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  closeModal();
}

// Render books on the page
function renderBooks() {
  const bookCardsDiv = document.getElementById('bookCards');
  bookCardsDiv.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>${book.info()}</p>
      <button onclick="removeBook(${index})">Remove</button>
    `;
    bookCardsDiv.appendChild(card);
  });
}

// Remove book from library
function removeBook(index) {
  myLibrary.splice(index, 1);
  renderBooks();
}

// Open modal
function openModal() {
  const modal = document.getElementById('bookForm');
  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('bookForm');
  modal.style.display = 'none';
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;
}

// Event listeners
document.getElementById('newBookBtn').addEventListener('click', openModal);
document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', e => {
  const modal = document.getElementById('bookForm');
  if (e.target === modal) {
    closeModal();
  }
});
document.querySelector('form').addEventListener('submit', createBook);

// Initial render
renderBooks();
