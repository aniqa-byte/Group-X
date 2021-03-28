"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Call the controller
mainApp.controller("homeController", ($scope, $http) => {

    var id = Date.now()

    $scope.register_user = new User(id, "", "");

    $scope.registerUser = () => {
        $http.post("/user", $scope.register_user).then(() => {
            console.log(`User created - id: ${$scope.register_user.id}; email: ${$scope.register_user.email}`)
            $scope.register_user = new User("", "", "");
            // TODO registered user alert
        });
    };
});