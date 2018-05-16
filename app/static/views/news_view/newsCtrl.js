'use strict';

angular.module('sourceApp.news', [])

.controller('newsCtrl', ['$scope', '$rootScope', '$route', 'httpService', 'news', function($scope, $rootScope, $route, httpService, news) {

    $scope.news = news.reverse();
    var route = 'news';
    $rootScope.$emit('activateNavbar', route);

    var elementsPerPage = 2;

    $scope.currentUser = $rootScope.currentUser;

    getNewsTexts(0, elementsPerPage);

    $scope.currentPage = 1;

    /**
     *  Set paginator to have certain amount of news for each page.
     *
     * @param begin index of first element in page
     * @param end index of last element in page
     */
    function getNewsTexts(begin, end) {

        $scope.newsTexts = $scope.news.slice(begin, end);

        var pageAmount = Math.floor($scope.news.length / elementsPerPage + 0.9);
        $scope.totalPages = (pageAmount > 0) ? pageAmount : 1;

        if ($scope.currentPage > $scope.totalPages) {
            $scope.currentPage--;
        }
    }

    /**
     * Deprecated
     *
     * Not used.
     */
    function refresh() {

        var begin = $scope.currentPage - 1;
        var end = begin + elementsPerPage;

        getNewsTexts(begin, end)
    }

    /**
     * Delete selected piece of news from database and load route again.
     *
     * @param currentNews
     */
    $scope.removeNews = function(currentNews) {

        httpService.httpDelete('/api/v1/newstexts/' + currentNews.id + '/', function (success) {
            $route.reload();
        }, function (error) {
            console.log(error.data)
        });

        // angular.forEach($scope.news, function (value, index) {
        //
        //     if (currentNews.id === value.id) {
        //         $scope.news.splice(index, 1)
        //     }
        // });

        // refresh();

    };

    /**
     * Change to next page in UI.
     */
    $scope.nextPage = function() {

        var begin = $scope.currentPage * elementsPerPage;
        var end = begin + elementsPerPage;

        $scope.currentPage++;

        getNewsTexts(begin, end)
    };

    /**
     * Change to previous page in UI.
     */
    $scope.previousPage = function() {

        $scope.currentPage--;

        var begin = $scope.currentPage - elementsPerPage;

        if (begin < 0) {
            begin = 0
        }

        var end = begin + elementsPerPage;

        getNewsTexts(begin, end)
    };

    /**
     * Post a new piece of news to the database and then reload the route.
     */
    $scope.createNew = function () {

        var data = {title: $scope.newsTextTitle, content: $scope.newsTextContent};

        httpService.httpPost('/api/v1/newstexts/', data, function (success) {
            $route.reload();
        }, function (error) {
            alert("error: " + error.data)
        })
    }

}]);