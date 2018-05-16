'use strict';

// Declare app level module which depends on views, and components
angular.module('sourceApp').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/etusivu', {
        templateUrl: 'static/views/frontpage_view/frontPage.html',
        controller: 'frontPageCtrl'
    })

    .when('/jasenet/:type?', {
        templateUrl: 'static/views/members_view/members.html',
        controller: 'membersCtrl',
        resolve: {
            members: function (httpService) {

                return httpService.httpGet('/api/v1/users/');

            }
        }
    })

    .when('/uutiset', {
        templateUrl: 'static/views/news_view/news.html',
        controller: 'newsCtrl',
        resolve: {
            news: function (httpService) {

                return httpService.httpGet('/api/v1/newstexts/');

            }
        }
    })

    .when('/tapahtumat', {
        templateUrl: 'static/views/happenings_view/happenings.html',
        controller: 'happeningsCtrl',
        resolve: {
            happenings: function (httpService) {

                return httpService.httpGet('/api/v1/happenings/');

            }
        }

    })

    .otherwise('/etusivu');
}]);
