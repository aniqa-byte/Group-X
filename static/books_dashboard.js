"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("booksController", ($scope, $http) => {

    // Updates display
    document.getElementById("selected").style.display="none";
    document.getElementById("edit_selected").style.display="none";
    document.getElementById("search_results").style.display="none";
    document.getElementById("create_table").style.display="none";

    // Supply data table display
    $http.get("/all-books").then((response) => {
        $scope.books = response.data;
    });

    // Pass input data to search function
    $scope.searchBook = (title) => {

        // Call get method applying param
        $http.get("/search-book/" + title).then((response) => {
            $scope.searchedBook = response.data;
            // Update display
            document.getElementById("search_results").style.display="block";
        });
    };

    /* Not used due ineffective standard table update (see below)
    $http.get("/all-book-genres").then((response) => {
        $scope.book_genres = response.data;
    });
    */

    /* Ineffective, TODO, dropdown list updates but result table not
    $scope.updateGenreSelection = () => {

        $scope.selectedGenre = new Book_genre (genre);

        $http.get("/books-genre-match/" + $scope.selectedGenre.genre).then((response) => {
            $scope.selectedGenre = new Book_genre ("");
            $scope.books = response.data;
            document.getElementById("books_main").style.display="block";
        });
    };
    */

    // Initate creation display
    $scope.openCreateMode = () => {

        // Update display
        document.getElementById("selected").style.display="none";
        document.getElementById("edit_selected").style.display="none";
        document.getElementById("search_results").style.display="none";
        document.getElementById("create_button").style.display="none";
        document.getElementById("create_table").style.display="block";
    };

    // Pass input data to post http method
    $scope.createBookEntry = (title, author, genre, item_link, item_description) => {

        // Create new book object
        $scope.add_book = new Book_complete (title, author, genre, item_link, item_description);

        // Post http method containing vook data
        $http.post("/book", $scope.add_book).then(() => {
            console.log("Successfully added new title:" + $scope.add_book.title);
            // Reset object
            $scope.add_book = new Book_complete ("", "", "", "", "");
            // Update display table with new data
            $http.get("/all-books").then((response) => {
                $scope.add_book = new Book_complete ("", "", " ", "", " ");
                $scope.books = response.data;
                // Update display
                document.getElementById("create_table").style.display="none";
                document.getElementById("create_button").style.display="block";
            });
        });
    };

    // Initiate hide cancel method
    $scope.hideEntry = () => {
        // Update display
        document.getElementById("create_table").style.display="none";
        document.getElementById("edit_selected").style.display="none";
        document.getElementById("create_button").style.display="block";
    };

    // Pass selected data to http client
    $scope.selectBook = (title) => {
        // Locate matching details
        $http.get("/book/" + title).then((response) => {
            $scope.selectedBook = response.data;
            // Update display
            document.getElementById("selected").style.display="block";
            document.getElementById("create_table").style.display="none";
            document.getElementById("edit_selected").style.display="none";
        });
    };

    // Pass input data to http get client method
    $scope.editBook = (title) => {
        // Get mathing data through this path
        $http.get("/search-book/" + title).then((response) => {
            // Supply edit table with data matching searched book
            $scope.editSelected = response.data;
            $scope.selectedBook = response.data;
            // Update display
            document.getElementById("edit_selected").style.display="block";
        });
    };

    // Pass param to http delete client method
    $scope.deleteBook = (title) => {
        // Delete http client matching title param
        $http.delete("/book/" + title).then(() => {
            console.log("Deleted book: " + title);
            // Replinish total table display with updated data
            $http.get("/all-books").then((response) => {
                $scope.books = response.data;
                // Update display
                document.getElementById("selected").style.display="none";
                document.getElementById("edit_selected").style.display="none";
            });
        });
    };

    // Passes data through to put method
    $scope.updateGenre = (title, genre) => {
        // Reconstruct book object with input
        $scope.update_genre = new Book_complete (title, "", genre, "", "");
        // Call put endpoint for book match
        $http.put("/update/book/genre/", $scope.update_genre).then(() => {
            console.log("Genre Updated: " + $scope.update_genre.genre)
            // Retrieve total data with update
            $http.get("/all-books").then((response) => {
                // Reset object
                $scope.update_genre = new Book_complete ("", "", " ", "", "");
                $scope.books = response.data;
            });
        });
    };

    // Passes data through to put method
    $scope.updateLink = (title, item_link) => {
        // Reconstruct book object with input
        $scope.update_link = new Book_complete (title, "", "", item_link, "");
        // Call put endpoint for book match
        $http.put("/update/book/link/", $scope.update_link).then(() => {
            console.log("Link Updated: " + $scope.update_link.item_link)
            // Reset object
            $scope.update_link = new Book_complete ("", "", "", "", "");
            // Retrieve data with update
            $http.get("/book/" + title).then((response) => {
                $scope.selectedBook = response.data;
            });
        });
    };

    // Passes data through to put method
    $scope.updateDescription = (title, item_description) => {
        // Reconstruct book object with input
        $scope.update_descript = new Book_complete (title, "", "", "", item_description);
        // Call put endpoint for book match
        $http.put("/update/book/description/", $scope.update_descript).then(() => {
            console.log("Description Updated: " + $scope.update_descript.item_description)
            // Reset object
            $scope.update_descript = new Book_complete ("", "", "", "", " ");
            // Retrieve data with update
            $http.get("/book/" + title).then((response) => {
                $scope.selectedBook = response.data;
            });
        });
    };
 });