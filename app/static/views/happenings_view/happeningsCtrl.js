'use strict';

angular.module('sourceApp.happenings', [])


    .controller('happeningsCtrl', ['$scope', '$rootScope', '$route', 'httpService', 'happenings', function($scope, $rootScope, $route, httpService, happenings) {

        var route = 'happenings';
        $rootScope.$emit('activateNavbar', route);

        $scope.happeningTitle = "";
        $scope.happeningContent = "";
        $('#happeningDate').val = "";

        $scope.currentUser = $rootScope.currentUser;
        $scope.currentPage = 1;

        var elementsPerPage = 2;

        $scope.happenings = happenings.reverse().map(function (currentValue) {
            var tempDateArray = currentValue.date.split('-');
            currentValue.date = tempDateArray[2] + '.' + tempDateArray[1] + '.' + tempDateArray[0];

            return currentValue;
        });

        var pageAmount = Math.floor($scope.happenings.length / elementsPerPage + 0.9);
        $scope.totalPages = (pageAmount > 0) ? pageAmount : 1;

        var happeningsChunks = chunk($scope.happenings, elementsPerPage);

        function chunk (arr, len) {
            var chunks = [],
                i = 0,
                n = arr.length;
            while (i < n) {
                chunks.push(arr.slice(i, i += len));
            }
            return chunks;
        }

        getHappeningsData();

        function getHappeningsData() {
            $scope.happeningsData = happeningsChunks[$scope.currentPage-1];
        }

        $scope.removeHappening = function(happening) {

            httpService.httpDelete('/api/v1/happenings/' + happening.id + '/', function (success) {
                $route.reload();
            }, function (error) {
                console.log(error.data)
            });
        };

        $scope.nextPage = function() {

            if ($scope.currentPage < $scope.totalPages) {
                $scope.currentPage++;
                getHappeningsData();
            }
        };

        $scope.previousPage = function() {

            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                getHappeningsData();
            }
        };

        $scope.createHappening = function () {

            //date must beformatted to YYYY-MM-DD
            var happeningDate = $('#happeningDate').val();
            var happeningDateArray = happeningDate.split('.');

            var day = happeningDateArray[0];
            var month = happeningDateArray[1];
            var year = happeningDateArray[2];

            var tmpDate = year + "-" + month + "-" + day;

            var data = {title: $scope.happeningTitle, content: $scope.happeningContent, date: tmpDate};

            httpService.httpPost('/api/v1/happenings/', data, function (success) {
                $route.reload();
            }, function (error) {
                console.log(error.data);
            });

        };




    }]);