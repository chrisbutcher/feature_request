'use strict';


angular.module('FeatureRequestApp')
    .controller('FeatureRequestCtrl', function ($scope) {

        var f1 = {
            title: "request 1",
            text: "this is my request",
            author: "James",
            date: "2010-10-11 07:20:35",
            priority: 0,
            comments: []
        };
        f1.comments.push({
            author: "Jeff",
            date: "2010-10-15 04:12:31",
            text: "it does not work."
        });
        f1.comments.push({
            author: "Lee",
            date: "2010-10-15 04:12:31",
            text: "working on it."
        });
        var f2 = {
            title: "request B",
            text: "this is quite a request",
            author: "Stacey",
            date: "2013-11-26 05:13:05",
            priority: 1,
            comments: []
        };
        f2.comments.push({
            author: "Kelvin",
            date: "2010-10-15 06:19:51",
            text: "it is broken."
        });
        f2.comments.push({
            author: "Jones",
            date: "2013-11-27 04:12:31",
            text: "i don't think so."
        });
        var f3 = {
            title: "request S",
            text: "this is a great request",
            author: "Bruce",
            date: "2013-09-05 12:45:32",
            priority: 2,
            comments: []
        };

        $scope.appName = "Feature Request Manager";

        $scope.requests = [];
        $scope.requests.push(f1);
        $scope.requests.push(f2);
        $scope.requests.push(f3);
        $scope.selectedRequest = null;

        $scope.newRequest = null;

        $scope.newComment = {
            author: "",
            text: "",
            date: ""
        };

        $scope.deleteRequest = function(index)     {
            $scope.requests.splice(index,1);
        };
        $scope.requestUp = function(index) {
            if (index !== 0)
            {
                var temp = $scope.requests[index].priority;
                $scope.requests[index].priority = $scope.requests[index -1].priority;
                $scope.requests[index - 1].priority = temp;

                sortRequestsByPriority();
            }
        };
        $scope.requestDown = function(index) {
            if (index !== $scope.requests.length - 1)
            {
                var temp = $scope.requests[index].priority;
                $scope.requests[index].priority = $scope.requests[index + 1].priority;
                $scope.requests[index + 1].priority = temp;

                sortRequestsByPriority();
            }

        };
        $scope.selectRequest = function(request) {
            $scope.selectedRequest = request;
        };

        $scope.postNewComment = function() {
            $scope.newComment.date = new Date();
            $scope.selectedRequest.comments.push($scope.newComment);

            $scope.newComment = {
                author: "",
                text: "",
                date: ""
            };
        };


        $scope.createNewRequest = function() {
            $scope.newRequest = {
                title: "",
                text: "",
                author: "",
                date: "",
                priority: findMaxPriority() + 1,
                comments: []
            };
        };
        $scope.postNewRequest = function() {
            $scope.requests.push($scope.newRequest);
            $scope.newRequest = null;
            sortRequestsByPriority();
        };
        $scope.cancelNewRequest = function() {
            $scope.newRequest = null;
        };

        function findMaxPriority()
        {
            var max = 0;
            angular.forEach($scope.requests, function(value, key){
                 if (value.priority > max) {
                    max = value.priority;
                 }
            });
            return max;
        }
        function sortRequestsByPriority()
        {
            $scope.requests.sort(function(a,b){
                return a.priority > b.priority;
            });
        }
    });