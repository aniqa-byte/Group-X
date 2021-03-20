"use strict";

// Value the mainApp
var mainApp = angular.module("mainApp", []);

// Initiate the controller app
mainApp.controller("usersController", ($scope, $http) => {

    $http.get('/all-users').then((response) => {
        $scope.users = response.data;
    });

    $scope.selectUser = (id) => {
        // Retrieve user
        $http.get("/user/" + id).then((response) => {
            $scope.selectedUser = response.data;
        });
    }
});