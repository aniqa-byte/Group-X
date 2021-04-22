"use strict";

// Value the mainApp
var mainApp = angular.module("mainApp", []);

// Initiate the controller app
mainApp.controller("usersController", ($scope, $http) => {
    // Hides selected sub table data
    document.getElementById("selected").style.display="none";
    // Retrieve all user data
    $http.get('/all-users').then((response) => {
        $scope.users = response.data;
    });

    $scope.selectUser = (email) => {
        console.log("User selected: " + email)
        // Call endpoint retrieve user by email parameter
        $http.get("/user/" + email).then((response) => {
            $scope.selectedUser = response.data;
            // Display selected content within div
            document.getElementById("selected").style.display="block";
        });
    }

    $scope.deleteUser = (email) => {
        // Call endpoint retrieve user
        $http.delete("/user/" + email).then(() => {
            console.log("Deleted user: " + email)
            // Retrieve all user data
            $http.get("/all-users").then((response) => {
                $scope.users = response.data;
                // Display updated users list
                document.getElementById("selected").style.display="none";
            });
        });
    };

    $scope.updateUserEmail = (id, email) => {
        // Call put endpoint for user email match
        $scope.update_email = new User (id, email);
        console.log("User selected for update: " + $scope.update_email.id)
        $http.put("/update/email", $scope.update_email).then(() => {
            console.log("Updated email: " + $scope.update_email.email)
            $scope.update_email = new User ("", "");
            // Retrieve all user data
            $http.get("all-users").then((response) => {
                $scope.users = response.data;
                // Retrieve updated selected user data
                $http.get("/user/" + email).then((response) => {
                    $scope.selectedUser = response.data;
                    // Display updated content
                    document.getElementById("selected").style.display="block";
                });
            });
        });
    };

    $scope.updateUserPass = (id, password) => {
        // Call put endpoint for user id match
        $scope.update_pass = new Credential (id, password);
        $http.put("/update/pass", $scope.update_pass).then(() => {
            console.log("Password updated: " + $scope.update_pass.password)
            $scope.update_pass = new Credential ("", "");
        });
    };

    $scope.hideEntry = () => {

        document.getElementById("selected").style.display="none";
    };
});