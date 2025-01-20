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

    // Add a cell for the read status
    const readCell = row.insertCell();
    readCell.textContent = book.isRead ? "Yes" : "No";

    // Add a "Toggle Read Status" button with a data-attribute for the book's index
    const toggleCell = row.insertCell();
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Read Status";
    toggleButton.setAttribute("data-index", index); // Associate the button with the book's index
    toggleButton.addEventListener("click", toggleReadStatus); // Add event listener
    toggleCell.appendChild(toggleButton);

    // Add a "Remove" button with a data-attribute for the book's index
    const removeCell = row.insertCell();
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-index", index); // Associate the button with the book's index
    removeButton.addEventListener("click", removeBook); // Add event listener
    removeCell.appendChild(removeButton);
  });
}

// Function to toggle a book's read status
function toggleReadStatus(event) {
  const index = event.target.getAttribute("data-index"); // Get the book's index
  myLibrary[index].toggleReadStatus(); // Toggle the read status
  displayLibrary(); // Re-render the table
}

// Function to remove a book from the library
function removeBook(event) {
  const index = event.target.getAttribute("data-index"); // Get the book's index
  myLibrary.splice(index, 1); // Remove the book from the array
  displayLibrary(); // Update the table
}

// Example usage
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayLibrary(); // Render the initial table
