'use strict';

angular.module('sourceApp.members', [])


    .controller('membersCtrl', ['$scope', '$rootScope', 'members', function($scope, $rootScope, members) {

        var route = 'members';
        $rootScope.$emit('activateNavbar', route);

        $scope.members = members;

        console.log("NAKYMA 2");





    }]);