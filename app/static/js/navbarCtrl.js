'use strict';

// Declare app level module which depends on views, and components
var sourceApp = angular.module('sourceApp');

sourceApp.controller('navbarCtrl', ['$scope', '$rootScope', 'authenticationService', function($scope, $rootScope, Authentication) {

    var exElement;

    activate();

    $scope.currentUser = $rootScope.currentUser;

    this.login = function () {
        //if response.success / else
        Authentication.login($scope.username, $scope.password)
    };

    this.logout = function () {
        //if response.success / else
        Authentication.logout()
    };

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     */
    function activate() {
        // If the user is authenticated, they should not be here.

        if (Authentication.isAuthenticated()) {

            $rootScope.currentUser = Authentication.getAuthenticatedUser();

        }
    }

    $rootScope.$on('activateNavbar', function(event, route) {

        if (exElement !== undefined) {
            $(exElement).removeClass(' active');
        }
        var element = document.getElementById(route);

        element.classList ? element.classList.add('active') : element.className += ' active';
        exElement = element;

    });


}]);