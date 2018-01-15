'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ngCookies',
  'message.flash'
])
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/admin/login', {
            templateUrl: 'partials/admin/login.html',
            controller: 'AdminLoginCtrl'
        });
        //new area
        $routeProvider.when('/admin/add-update-user/:id', {
            templateUrl: 'partials/admin/add-edit-user.html',
            controller: 'AdminAddEditUserCtrl'
        });
        $routeProvider.when('/admin/pages', {
            templateUrl: 'partials/admin/pages-list.html',
            controller: 'AdminPagesCtrl'
        });
        $routeProvider.when('/admin/add-edit-page/:id', {
            templateUrl: 'partials/admin/add-edit-page.html',
            controller: 'AddEditPageCtrl'
        });
        //new area
        $routeProvider.when('/admin/add-edit-shopItem/:id', {
            templateUrl: 'partials/admin/add-edit-shopItem.html',
            controller: 'AddEditShopItemCtrl'
        });
        $routeProvider.when('/:url', {
            templateUrl: 'partials/page.html',
            controller: 'PageCtrl'
        });
        $routeProvider.when('/user/register', {
            templateUrl: 'partials/user-register.html',
            controller: 'UserRegisterCtrl'
        });
        //new area
        $routeProvider.when('/user/profile/:id', {
            templateUrl: 'partials/user-profile.html',
            controller: 'UserProfileCtrl'
        });
        $routeProvider.when('/user/shop', {
            templateUrl: 'partials/shop.html',
            controller: 'UserShopCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/home'});

        $locationProvider.html5Mode(true);
    }
])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
});
