document.getElementById('spinner').style.display = 'none';
const errorMessage = document.getElementById('error-message');

const searchBook = () => {
    document.getElementById('show-count').textContent = '';
    document.getElementById('search-result').textContent = '';
    document.getElementById('book-numbers').textContent = '';
    errorMessage.textContent = '';

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Clear data from the search field
    searchField.value = '';

    // Handle empty search request
    if (searchText == '') {
        // Write a topic to search
        document.getElementById('spinner').style.display = 'none';
        errorMessage.innerText = 'Provide a Valid Topic';
    } else {
        // Display the spinner
        document.getElementById('spinner').style.display = 'block';

        //  Clear the search result
        document.getElementById('search-result').textContent = '';

        // load data from API
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data));
    }
}

// Display Search Result
const displaySearchResult = books => {
    let count = 0;
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // Count Showed Result
    document.getElementById('show-count').style.display = 'block';

    const bookList = books.docs;
    
    
    // Validating If The Book Exists In The Database
    if (books.numFound === 0) {
        document.getElementById('spinner').style.display = 'none';
        errorMessage.innerText = 'No Result Found';
    } else {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${books.numFound}`;
        // Retrieve each book from the Database using API and display in a card
        bookList.forEach(book => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
            <div class="card mb-3 shadow-lg p-2">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${getCover(book.cover_i)}" class="img-fluid rounded-start border" style="width:180px; height:230px;" alt="...">
                    </div>
                <div class="col-md-7">
                <div class="card-body h-100 d-flex flex-column justify-content-between py-1">
                    <p class="card-title my-0"><h5>Book Title: ${book.title}</h5></p>
                    <p class="card-text my-0"><span class="card-text fw-bold">First Publish Year: </span>${book?.first_publish_year ?? 'unknown'}</p>
                    <p class="card-text my-0"><span class="card-text fw-bold">Publisher: </span>${book?.publisher?.[0] ?? 'unknown'}</p>
                    <p class="card-text my-0"><span class="card-text fw-bold">Author Name: </span><span class="fw-bold text-danger">${book?.author_name?.[0] ?? 'unknown'}</span></p>
                </div>
            </div>
                `;
                searchResult.appendChild(div);
                count++;
            
        });
        // Creating a counter to count and display the number of showed results
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('show-count').innerHTML = `<h3 class='bg-primary text-white w-100 m-auto text-center p-2 rounded'>Showing ${count} Books</h3>`;
        document.getElementById('show-count').display = 'block';
    }
}

// Get Cover image if it exists or Replace it with default cover image 
const getCover = url => {
    if (url != undefined) {
        return `https://covers.openlibrary.org/b/id/${url}-M.jpg`;
    } else {
        return `images/no_book_cover.jpg`
    }
}