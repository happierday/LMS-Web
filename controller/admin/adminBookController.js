angular.module('library').controller('adminBookController',["$scope","$http","requestUrl",'$window','$compile',
    function($scope,$http,url,$window,$compile){
        $http.get(url+"/getBooks?pageNo=1")
            .then(data => {
                $scope.books = data.data;
            })

        $scope.addBook = function(){
            $scope.getDetail();
            $scope.book = null;
            $scope.selectedBranches = null;
        }

        $scope.getDetail = function(){
            $http.get(url+"/getAuthors")
                .then(data => {
                    $scope.authors = data.data;
                })
            $http.get(url+"/getGenres")
                .then(data => {
                    $scope.genres = data.data;
                })
            $http.get(url+"/getBranches")
                .then(data => {
                    $scope.branches = data.data;
                })
            $http.get(url+"/getPublishers")
                .then(data => {
                    $scope.publishers = data.data;
                })
        }

        $scope.deleteBook = function(bookId){
            $http.get(url+"/deleteBook/"+bookId)
                .then(data => {
                    $scope.loans = data.data.object;
                    var e = document.createElement('div');
                    e.innerHTML = data.data.message;
                    if(data.data.success){
                        e.className = 'alert alert-success';
                        
                    }else{
                        e.className = 'alert alert-danger';
                    }
                    angular.element(document.getElementsByClassName('message')).append(e);
                })
        }

        $scope.editBook = function(book){
            $scope.book = book;
            $scope.selectedBranches = {value:book.branches};
            $scope.getDetail();
        }

        $scope.selected = function(){
            if($scope.book != null){
                let branches = $scope.book.branches;
                for(j in $scope.selectedBranches.value){
                    for(i in branches){
                        if(branches[i].id == $scope.selectedBranches.value[j].id){
                            $scope.selectedBranches.value[j] = branches[i];
                        }
                    }
                }
            }   
        }

        $scope.submit = function(){
            for(j in $scope.selectedBranches.value){
                $scope.selectedBranches.value[j].copies = Number($scope.selectedBranches.value[j].copies);
            }
            $scope.book.branches = $scope.selectedBranches.value;
            var action = "";
            if($scope.book.id == null){
                action = "/addBook";
            }else{
                action = "/updateBook";
            }
            $http.post(url+action,$scope.book)
                .then(data => {
                    var e = document.createElement('div');
                    e.innerHTML = data.data.message;
                    if(data.data.success){
                        e.className = 'alert alert-success';
                        
                    }else{
                        e.className = 'alert alert-danger';
                    }
                    angular.element(document.getElementsByClassName('message')).append(e);
                })
        }
}])

