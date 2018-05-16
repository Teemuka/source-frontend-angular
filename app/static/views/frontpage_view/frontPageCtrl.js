'use strict';

angular.module('sourceApp.frontPage', [])


.controller('frontPageCtrl', ['httpService', '$scope', '$rootScope', function(httpService, $scope, $rootScope) {


    var route = 'frontpage';
    $rootScope.$emit('activateNavbar', route);

    console.log("NAKYMA 1");


}]);