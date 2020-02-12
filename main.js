//Book Class: Represents a book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Event: Add a book
const form = document.querySelector('#book-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //get values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validation
    if(title==='' || author==='' || isbn===''){
        UI.showAlert('field is empty!','danger');
    }else{

        //Instantiate book
        const book = new Book(title, author, isbn);
        //pass the array to addBookList method to add
        UI.addBookToList(book);
        //Add book to store
        Store.addBook(book);
        //show alert
        UI.showAlert('Book Added!','success');
        //clear input field after adding
        UI.clearFields(); 
    }


});


//Remove a Book
const list = document.querySelector('#book-list'); //select the list and set target where to click
list.addEventListener('click',(e)=>{
    UI.deleteBook(e.target);

    //show alert
    UI.showAlert('Book Removed!','info');    
});


//UI Class: handle UI Tasks
class UI{

    //method to display books
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book)); //call method and add book
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td> <a href="#" class="btn btn-danger btn-sm pull-right delete">X</a> </td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`; //classname
        div.appendChild(document.createTextNode(message)); //message

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form); //insert the div before the form
    
        //set timeout
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
}
//Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Store Class: handle storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}
