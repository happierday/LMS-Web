angular.module('library').controller('adminDateController',['$scope','$http','requestUrl','$filter','$timeout',
function($scope,$http,url,$filter,$timeout){
    $http.get(url+'/getLoans?pageNo=1')
        .then(data => {
            //console.log(data);
            $scope.loans = data.data;
        })

    $http.get(url+"/getLoansCount")
        .then(data => {
            $scope.pageSize = Math.ceil(data.data/10);
            $scope.getNumber = function(pageSize) {
                return new Array(pageSize);   
            }            
    })

    $scope.gotoPage = function(pageNo){
        var query = "/getLoans?pageNo="+pageNo;
        if($scope.searchTitle != null){
            query = query + "&searchTitle="+$scope.searchString
        }
        $http.get(url+query)
            .then(data => {
                //console.log(data);
                $scope.loans = data.data;
            })
    }

    $scope.search = function(){
        var query = "/getLoans?pageNo=1";
        var queryCount = "/getLoansCount"
        if($scope.searchTitle != null){
            query += ('&searchTitle='+$scope.searchTitle);
            queryCount += ('?searchTitle='+$scope.searchTitle);
        }
        
        $http.get(url+queryCount)
            .then(data => {
                // console.log(data);
                $scope.pageSize = Math.ceil(data.data/10);
                $scope.getNumber = function(pageSize) {
                    return new Array(pageSize);   
                }            
                $scope.bookCount = data.data;
        })
        // if($scope.searchBorrower != null){
        //     query += ('&searchBorrower='+$scope.searchBorrower);
        // }
        // if($scope.searchBranch != null){
        //     query += ('&searchBranch='+$scope.searchBranch);
        // }
        $http.get(url+query)
            .then(data => {
                // console.log(data);
                $scope.loans = data.data;
        })
        // $http.get(url+query)
        //     .then(data => {
        //         $scope.pageSize = Math.ceil(data.data/10);
        //         $scope.getNumber = function(pageSize) {
        //             return new Array(pageSize);   
        //         }            
        //         $scope.bookCount = data.data;
        // })
    }

    $scope.editLoan = function(loan){
        $scope.loan = loan;
    }

    $scope.submit = function(){
        var dueDate = new Date($scope.convertDate($scope.loan.dueDate));
        var dateIn = new Date($scope.convertDate($scope.loan.dateOut));
        var today = new Date();
        if(dueDate > dateIn && dueDate > today){
            $http.post(url+"/updateLoan",$scope.loan)
                .then(data => {
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
        } else {
            var e = document.createElement('div');
            e.className = 'alert alert-warning';
            e.innerHTML = "Due Date must be before today and before DateOut";
            angular.element(document.getElementsByClassName('message')).append(e);
            $timeout(function(){
                location.reload();
            },2000)
        }
    }

    $scope.deleteLoan = function(loan){
        $http.post(url+"/deleteLoan",loan)
            .then(data => {
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

    $scope.convertDate = function(date){
        var dateVal = date.substring(5,7)+"/"+date.substring(8)+"/"+date.substring(0,4);
        return dateVal;
    }
}])