'use strict';


angular.module('FeatureRequestApp')
    .controller('FeatureRequestCtrl', function ($scope, $http) {

        $scope.requests = [];
/*
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
        };*/


        $http.get("/requests").success(function(requests){
            $scope.requests = requests;
            //ortRequestsByPriority();
        });
        $scope.appName = "Feature Request Manager";


        /*$scope.requests.push(f1);
        $scope.requests.push(f2);
        $scope.requests.push(f3);*/
        $scope.selectedRequest = null;

        $scope.newRequest = null;

        $scope.newComment = {
            author: "",
            text: "",
            date: ""
        };

        $scope.doneDescription = function(boolean){
            return boolean ? ' (Done)' : '';
        };

        $scope.deleteRequest = function(request, index)     {

            $http.delete("/requests/" + request._id).success(function(){
                $scope.requests.splice(index,1);
                sortRequestsByPriority();
                $scope.selectedRequest = null;
            }).error(function(error)
                {
                    alert(error);
                });

        };
        $scope.requestUp = function(index) {
            if (index !== 0)
            {
                switchPriority($scope.requests[index], $scope.requests[index - 1]).then(function(){
                    var temp = $scope.requests[index].priority;
                    $scope.requests[index].priority = $scope.requests[index -1].priority;
                    $scope.requests[index - 1].priority = temp;

                    sortRequestsByPriority();
                }, function(error) {

                alert(error);
                });
            }
        };
        $scope.requestDown = function(index) {
            if (index !== $scope.requests.length - 1)
            {
                switchPriority($scope.requests[index], $scope.requests[index + 1]).then(function(){
                    var temp = $scope.requests[index].priority;
                    $scope.requests[index].priority = $scope.requests[index + 1].priority;
                    $scope.requests[index + 1].priority = temp;

                    sortRequestsByPriority();
                }, function(error) {

                alert(error);
            });
            }
        };

        function switchPriority(requestA, requestB){
            return $http.put("/requests/" + requestA._id, { "priority": requestB.priority }).then(function(){
                return $http.put("/requests/" + requestB._id, { "priority": requestA.priority })
            })

        }
        $scope.completeRequest = function(isComplete) {

            console.log(event);
            if (isComplete === true) {
                if (confirm("Are you sure you want to complete this request?")) {
                    commitCompleteRequest(true);
                }
            } else { if (confirm("Are you sure you want to open this request?")) {
                commitCompleteRequest(false);

                }
            }

            //alert($scope.selectedRequest.is_complete);
        }

        function commitCompleteRequest(isComplete) {
            $http.put("/requests/" + $scope.selectedRequest._id, { "is_complete": isComplete }).then(function(){
                $scope.selectedRequest.is_complete = isComplete;
            },function(error){
                alert(error);
            })
        }
        $scope.selectRequest = function(request) {
            $scope.selectedRequest = request;
        };

        $scope.postNewComment = function() {
            $scope.newComment.date = new Date();

            $http.post("/requests/" + $scope.selectedRequest._id + "/comment", {"comment": $scope.newComment }).success(function(newCommentId){

                $scope.newComment._id = newCommentId
                $scope.selectedRequest.comments.push($scope.newComment);

                $scope.newComment = {
                    author: "",
                    text: "",
                    date: ""
                };
            }).error(function(error)
                {
                    alert(error);
                });

        };


        $scope.createNewRequest = function() {
            $scope.newRequest = {
                title: "",
                text: "",
                author: "",
                date: "",
                is_complete: false,
                priority: findMaxPriority() + 1,
                comments: []
            };
        };

        $scope.postNewRequest = function() {
            $scope.newRequest.date = new Date();

            $http.post("/requests", {"request": $scope.newRequest}).success(function(newRequest){
                $scope.requests.push(newRequest);
                $scope.newRequest = null;
                sortRequestsByPriority();
            }).error(function(error)
                {
                    alert(error);
                });


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
                return a.priority - b.priority;
            });
        }
    });