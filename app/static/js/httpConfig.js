'use strict';

// Declare app level module which depends on views, and components
angular.module('sourceApp')

    .config(function($provide, $httpProvider) {

        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        $provide.factory('httpService', ['$http', function($http) {

            var remote = "";

            return {

                httpPost : httpPost,
                httpGet : httpGet,
                httpDelete : httpDelete

            };

            function httpPost(url, data, callbackSuccess, callbackError) {
                $http.post(remote+url, data).then(callbackSuccess, callbackError);
            }

            //returning promise for reusable code
            function httpGet(url) {
                return $http.get(remote+url).then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.data;
                });
            }

            function httpDelete(url, callbackSuccess, callbackError) {
                $http.delete(remote+url).then(callbackSuccess, callbackError);
            }
        }]);


    });


