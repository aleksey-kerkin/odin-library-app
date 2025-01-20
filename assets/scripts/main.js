const myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

// Function to display the library in the table
function displayLibrary() {
  const tableBody = document.getElementById("libraryTableBody");
  tableBody.innerHTML = ""; // Clear existing rows

  myLibrary.forEach((book, index) => {
    const row = tableBody.insertRow();

    // Add book details to the row
    row.insertCell().textContent = book.title;
    row.insertCell().textContent = book.author;
    row.insertCell().textContent = book.pages;
    row.insertCell().textContent = book.isRead ? "Yes" : "No";

    // Add a "Remove" button with a data-attribute for the book's index
    const removeCell = row.insertCell();
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-index", index); // Associate the button with the book's index
    removeButton.addEventListener("click", removeBook); // Add event listener
    removeCell.appendChild(removeButton);
  });
}

// Function to remove a book from the library
function removeBook(event) {
  const index = event.target.getAttribute("data-index"); // Get the book's index from the data-attribute
  myLibrary.splice(index, 1); // Remove the book from the array
  displayLibrary(); // Update the table
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
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("isRead").checked;

    // Add the book to the library
    addBookToLibrary(title, author, pages, isRead);

    // Display the updated library
    displayLibrary();

    // Reset the form and close the dialog
    event.target.reset();
    dialog.close();
  });
