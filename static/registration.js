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

    $scope.login_user = new Login("", "");

    $scope.loginUser = () => {

        $scope.login_user = new Login($scope.login_user.email, $scope.login_user.password);

        $http.get("/validate-login/:email/:password", $scope.login_user).then(() => {
            console.log(`Validated User: ${$scope.login_user.email}`);
       })
    };
});