"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("booksController", ($scope, $http) => {

    // Hide the "selected" element of the bookcontroller
    document.getElementById("selected").style.display="none";

    $http.get("/all-books").then((response) => {
        $scope.books = response.data;
    });

    $http.get("/all-book-genres").then((response) => {
        $scope.book_genres = response.data;
    });

    $scope.updateGenreSelection = () => {

        $scope.selectedGenre = new Book_genre (genre);

        $http.get("/books-genre-match/" + $scope.selectedGenre.genre).then((response) => {
            $scope.selectedGenre = new Book_genre ("");
            $scope.books = response.data;
            document.getElementById("books_main").style.display="block";
        });
    };

    $scope.selectBook = (title) => {
    // Locate matching details
    $http.get("/book/" + title).then((response) => {
        $scope.selectedBook = response.data;
        // Display the "selected" element once item has been selected
        document.getElementById("selected").style.display="block";
        });
    }
 });