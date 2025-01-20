const myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Method to toggle the read status
Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

// Function to add a book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayLibrary(); // Update the display after adding a book
}

// Function to display the library as cards
function displayLibrary() {
  const libraryCardsContainer = document.getElementById(
    "libraryCardsContainer"
  );
  libraryCardsContainer.innerHTML = ""; // Clear existing cards

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Add book details to the card
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? "Read" : "Unread"}</p>
      <button data-index="${index}" class="toggleReadStatus">Toggle Read Status</button>
      <button data-index="${index}" class="removeBook">Remove</button>
    `;

    // Add event listeners for the buttons
    card
      .querySelector(".toggleReadStatus")
      .addEventListener("click", toggleReadStatus);
    card.querySelector(".removeBook").addEventListener("click", removeBook);

    // Append the card to the container
    libraryCardsContainer.appendChild(card);
  });
}

// Function to toggle a book's read status
function toggleReadStatus(event) {
  const index = event.target.getAttribute("data-index"); // Get the book's index
  myLibrary[index].toggleReadStatus(); // Toggle the read status
  displayLibrary(); // Re-render the cards
}

// Function to remove a book from the library
function removeBook(event) {
  const index = event.target.getAttribute("data-index"); // Get the book's index
  myLibrary.splice(index, 1); // Remove the book from the array
  displayLibrary(); // Update the display
}

// Get references to the dialog and buttons
const dialog = document.getElementById("bookDialog");
const openDialogButton = document.getElementById("openDialog");
const closeDialogButton = document.getElementById("closeDialog");

// Open the dialog when the "Add Book" button is clicked
openDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

// Close the dialog when the "Close" button is clicked
closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

// Handle form submission
document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("isRead").checked;

    // Add the book to the library
    addBookToLibrary(title, author, pages, isRead);

    // Reset the form and close the dialog
    event.target.reset();
    dialog.close();
  });

// Example usage
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayLibrary(); // Render the initial cards
