"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("booksController", ($scope, $http) => {

    // Hide the "selected" element of the bookcontroller
    document.getElementById("selected").style.display="none";

    $http.get('/all-books').then((response) => {
        $scope.books = response.data;
    });

    $scope.selectBook = (title) => {
    // Locate matching details
    $http.get("/book/" + title).then(function(response) {
        $scope.selectedBook = response.data;
        // Display the "selected" element once item has been selected
        document.getElementById("selected").style.display="block";
        });
    }
 });