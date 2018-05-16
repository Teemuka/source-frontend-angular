'use strict';
(function () {

angular.module('sourceApp.authentication')

    .factory('authenticationService', ['httpService', '$cookies', '$rootScope', function(httpService, $cookies, $rootScope) {

        var Authentication = {

            login : login,
            logout : logout,
            getAuthenticatedUser : getAuthenticatedUser,
            isAuthenticated : isAuthenticated,
            setAuthenticatedUser : setAuthenticatedUser,
            unauthenticate : unauthenticate
        };

        return Authentication;

        /**
         * @name getAuthenticatedUser
         * @desc Return the currently authenticated user.
         * @return {object | undefined} Account if authenticated, else undefined.
         */
        function getAuthenticatedUser() {
            if (!isAuthenticated()) {
                return undefined;
            }

            return JSON.parse($cookies.get("authenticatedUser"));
        }

        /**
         * @name isAuthenticated
         * @desc Check is current user is authenticated.
         * @return {boolean} True if user is authenticated, else False.
         */
        function isAuthenticated() {

            return !!$cookies.get("authenticatedUser");
        }

        /**
         * @name setAuthenticatedUser
         * @desc Stringify current user and set it to cookies.
         * @param {object} user Current user
         * @return {undefined}
         */
        function setAuthenticatedUser(user) {
            $cookies.put("authenticatedUser", JSON.stringify(user));
            $rootScope.currentUser = user;
        }

        /**
         * @name unauthenticate
         * @desc Delete the cookie where the user object is stored
         * @returns {undefined}
         */
        function unauthenticate() {
            $cookies.remove("authenticatedUser");
            $rootScope.currentUser = undefined;
        }

        //JOS login onnistuu niin tallennan cookies jms ja sitten kutsu taas controlleria, joka muuttaa ulkoasua jne
        function login(username, password, callback) {
            var data = {username : username, password : password};

            httpService.httpPost("/api/v1/auth/login/", data,
                //if response.success tallenna cookies jne ja kutsu callback
                function (success, status,header, config) {

                Authentication.setAuthenticatedUser(success.data);

                window.location = '/'

            }, function (error, status,header, config) {

                console.log("ERROR: " + error.data.message);
            })
        }

        function logout() {

            httpService.httpPost("/api/v1/auth/logout/", {},
                //if response.success tallenna cookies jne ja kutsu callback
                function (success, status,header, config) {
                    Authentication.unauthenticate();
                    window.location = '/';

                }, function (error, status,header, config) {
                    console.error("ERROR: " + error);
                })
        }
    }]);
})();
// Declare app level module which depends on views, and components
