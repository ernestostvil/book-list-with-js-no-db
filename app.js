//  book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI(){}

// ADD BOOK TO LIST
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // create a tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;


    list.appendChild(row);
    // console.log(row);
}

// CLEAR FIELDS
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// show error alert
UI.prototype.showAlert = function(message, className){
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // timeout afet 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}


// delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// EVENT LISTENERS for ADDbOOK
document.getElementById('book-form').addEventListener('submit', function(e){

    // GET FORM VALUES
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

// Instantiate book
const book = new Book(title, author, isbn);

// Instantiate UI
const ui = new UI();

// validate
if(title === '' || author ==='' || isbn ===''){
    // error alert
    ui.showAlert('Please fill in all the fields', 'error');
} else {
    // Add book to list
    ui.addBookToList(book);

    // show success
    ui.showAlert('Book added!', 'success')

    // Clear fields
    ui.clearFields();
}



    e.preventDefault();
});

 // event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert('Book removed', 'success');

    e.preventDefault();
})