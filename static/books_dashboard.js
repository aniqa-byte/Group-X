"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("booksController", ($scope, $http) => {

    // Hide the "selected" element of the bookcontroller
    document.getElementById("selected").style.display="none";
    document.getElementById("edit_selected").style.display="none";
    document.getElementById("search_results").style.display="none";
    document.getElementById("create_table").style.display="none";

    $http.get("/all-books").then((response) => {
        $scope.books = response.data;
    });

    $scope.searchBook = (title) => {
        $http.get("/search-book/" + title).then((response) => {
            $scope.searchedBook = response.data;

            document.getElementById("search_results").style.display="block";
        });
    };

    $http.get("/all-book-genres").then((response) => {
        $scope.book_genres = response.data;
    });

    // Ineffective
    $scope.updateGenreSelection = () => {

        $scope.selectedGenre = new Book_genre (genre);

        $http.get("/books-genre-match/" + $scope.selectedGenre.genre).then((response) => {
            $scope.selectedGenre = new Book_genre ("");
            $scope.books = response.data;
            document.getElementById("books_main").style.display="block";
        });
    };

    $scope.openCreateMode = () => {

        document.getElementById("selected").style.display="none";
        document.getElementById("edit_selected").style.display="none";
        document.getElementById("search_results").style.display="none";
        document.getElementById("create_button").style.display="none";
        document.getElementById("create_table").style.display="block";
    };

    $scope.createBookEntry = (title, author, genre, item_link, item_description) => {

        $scope.add_book = new Book_complete (title, author, genre, item_link, item_description);

        $http.post("/add-book", $scope.add_book).then(() => {
            console.log("Successfully added new title:" + $scope.add_book.title);
            $scope.add_book = new Book_complete ("", "", "", "", "");
            $http.get("/all-books").then((response) => {
                $scope.books = response.data;
                document.getElementById("create_table").style.display="none";
                document.getElementById("create_button").style.display="block";
            });
        });
    };

    $scope.hideEntry = () => {

        document.getElementById("create_table").style.display="none";
        document.getElementById("edit_selected").style.display="none";
        document.getElementById("create_button").style.display="block";
    };

    $scope.selectBook = (title) => {
    // Locate matching details
    $http.get("/book/" + title).then((response) => {
        $scope.selectedBook = response.data;
        // Display the "selected" element once item has been selected
        document.getElementById("selected").style.display="block";
        document.getElementById("edit_selected").style.display="none";
        });
    };

    $scope.editBook = (title) => {

        $http.get("/search-book/" + title).then((response) => {
            $scope.editSelected = response.data;
            $scope.selectedBook = response.data;
            document.getElementById("edit_selected").style.display="block";
        });
    };

    $scope.updateGenre = (title, genre) => {
        $scope.update_genre = new Book_complete (title, "", genre, "", "");
        $http.put("/update-book-genre/", $scope.update_genre).then(() => {
            console.log("Genre Updated: " + $scope.update_genre.genre)
            $http.get("/all-books").then((response) => {
                $scope.update_genre = new Book_complete ("", "", "", "", "");
                $scope.books = response.data;
            });
        });
    };

    $scope.updateLink = (title, item_link) => {
        $scope.update_link = new Book_complete (title, "", "", item_link, "");
        $http.put("/update-book-link/", $scope.update_link).then(() => {
            console.log("Link Updated: " + $scope.update_link.item_link)
            $http.get("/all-books").then((response) => {
                $scope.update_link = new Book_complete ("", "", "", "", "");
                $scope.books = response.data; // TODO doesnt realtime update dashboard
            });
        });
    };

    $scope.updateDescription = (title, item_description) => {
        $scope.update_descript = new Book_complete (title, "", "", "", item_description);
        $http.put("/update-book-description/", $scope.update_descript).then(() => {
            console.log("Book Description: " + $scope.update_descript.item_description)
            $http.get("/all-books").then((response) => {
                $scope.update_description = new Book_complete ("", "", "", "", "");
                $scope.books = response.data; // TODO doesnt realtime update dashboard
            });
        });
    };
 });