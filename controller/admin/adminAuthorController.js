angular.module('library').controller('adminAuthorController',['$scope','$http','requestUrl','$timeout',
    function($scope,$http,url,$timeout){

    $http.get(url+'/getAuthors?pageNo=1')
        .then(data => {
            // console.log(data);
            $scope.authors = data.data;
        })

    $scope.deleteAuthor = function(authorId){
        $http.get(url+'/deleteAuthor/'+authorId)
        .then(data => {
            console.log(data);
        }) 
    }    

    $scope.editAuthor = function(author){
        $scope.author = author;
        $scope.getDetail();
    }

    $scope.submit = function(){
        // console.log($scope.author);
        // console.log($scope.books);
        $http.post(url+'/updateAuthor',$scope.author)
            .then(data => {
                console.log(data);
                var e = document.createElement('div');
                e.innerHTML = data.data.message;
                if(data.data.success){
                    e.className = 'alert alert-success';
                    
                }else{
                    e.className = 'alert alert-danger';
                }
                angular.element(document.getElementsByClassName('message')).append(e);
                $timeout(function(){
                    location.reload();
                },2000)
            })
    }

    $scope.getDetail = function(){
        $http.get(url+"/getBooks")
            .then(data => {
                $scope.books = data.data;
            })
    }
}]);