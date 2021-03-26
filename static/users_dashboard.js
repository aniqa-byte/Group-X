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

    $scope.updateUserEmail = (id, email) => {
        // Call put endpoint for user email
        $scope.update_email = new User (id, email);
        $http.put("/update-email", $scope.update_email).then(() => {
            $scope.update_email = new User ("", "");
        });
    };
});