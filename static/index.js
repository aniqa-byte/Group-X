"use strict";

// Assign the mainApp
var mainApp = angular.module("mainApp", []);

// Call the controller
mainApp.controller("homeController", ($scope, $http) => {

    var id = Date.now()

    $scope.register_user = new User(id, "", "");

    $scope.registerUser = () => {
        $http.post("/user", $scope.register_user).then(() => {
            $scope.register_user = new ("", "", "");
            id = undefined;
            // TODO registered user alert
        });
    };
});