"use strict";

// Value the mainApp
var mainApp = angular.module("mainApp", []);

// Initiate the controller app
mainApp.controller("usersController", ($scope, $http) => {
    // Hides selected sub table data
    document.getElementById("selected").style.display="none";

    $http.get('/all-users').then((response) => {
        $scope.users = response.data;
    });

    $scope.selectUser = (email) => {
        // Call endpoint retrieve user
        $http.get("/user/" + email).then((response) => {
            $scope.selectedUser = response.data;
            // Display selected content within div
            document.getElementById("selected").style.display="block";
        });
    }

    $scope.deleteUser = (email) => {
        // Call endpoint retrieve user
        $http.delete("/user/" + email).then(() => {
            $http.get("/all-users").then((response) => {
                $scope.users = response.data;
            });
        });
    };

    $scope.update_email = new User("", "");

    // Sends a put message to update the data location
    $scope.updateUserEmail = () => {
        console.log($scope.update_email)
        // Sends a put put message to the users endpoint
        $http.put("/user", $scope.update_email).then((response) => {
            console.log("email updated");
            $scope.update_email = new User("", "");
            response.send("OK")
            // Refresh list of users
            $http.get("/users").then((response) => {
                $scope.users = response.data;
            });
        });
    };
});