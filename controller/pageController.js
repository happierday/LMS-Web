angular.module('library').controller('pageController',['$scope','$http','requestUrl',function($scope,$http,url){
    $scope.currentPage = 1;
    $http.get(url+"/getBooksCount")
        .then(data => {
            $scope.pageSize = Math.ceil(data.data/10);
            $scope.getNumber = function(pageSize) {
                return new Array(pageSize);   
            }            
            $scope.bookCount = data.data;
        })
    
    $scope.gotoPage = function(pageNo){
        console.log(pageNo);
    }
}])