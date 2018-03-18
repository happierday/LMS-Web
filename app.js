var library = angular.module('library',['ngRoute','ngAnimate','ngMessages','ngTouch','ui.bootstrap']);

library.config(['$routeProvider',function($routerProvider){
    $routerProvider
        .when('/admin',{
            templateUrl:'./views/admin.html'
        })
        .when('/admin/book',{
            templateUrl:'./views/adminbook/book.html'
        })
        .when('/admin/viewbook',{
            templateUrl:'./views/adminbook/viewBook.html',
            controller: 'adminBookController'
        })
        .when('/admin/viewauthor',{
            templateUrl:'./views/adminauthor/author.html',
            controller: 'adminAuthorController'
        })
}])
