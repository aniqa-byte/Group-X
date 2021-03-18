"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("booksController", ($scope, $http) => {

    $http.get('/all-books').then((response) => {
        $scope.books = response.data;
    });

    $scope.selectBook = (title) => {
    // Locate matching details
    $http.get("/book/" + title).then(function(response) {
        $scope.selectedBook = response.data;
        });
    }
 });