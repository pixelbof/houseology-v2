'use strict';
angular.module('myApp.controllers', [])
.controller('AppCtrl', ['$scope','AuthService','flashMessageService','$location','$cookies', function($scope,AuthService,flashMessageService,$location,$cookies) {
  $scope.site = {
      logo: "img/angcms-logo.png",
      footer: "Copyright 2014 Angular CMS"
  };

  $scope.logout = function() {
    AuthService.logout().then(
      function() {
        $cookies.remove('loggedInUser');
        $location.path('/admin/login');
        flashMessageService.setMessage("Successfully logged out");
  
      }, function(err) {
          console.log('there was an error tying to logout');
      });
  };
}
])
.controller('UserRegisterCtrl', ['$scope','$routeParams','AuthService','flashMessageService', function($scope,$routeParams,AuthService,flashMessageService) {
  $scope.register = function(credentials) {

    AuthService.register(credentials).then(
      function(res, err) {
        flashMessageService.setMessage("Successfully registered user");
        //$location.path('/admin/pages');
        $scope.$emit('user-created', {
          username: credentials.username,
          password: credentials.password,
          role: credentials.role
        });

      },
      function(err) {
        flashMessageService.setMessage(err.data);

        console.log(err);

    });
  };
}])
.controller('PageCtrl', ['$scope','pagesFactory', '$routeParams', '$sce', function($scope, pagesFactory, $routeParams,$sce) {
  var url = $routeParams.url;
  pagesFactory.getPageContent(url).then(
    function(response) {
      $scope.pageContent = {};
      $scope.pageContent.title = response.data.title;
      $scope.pageContent.content = $sce.trustAsHtml(response.data.content);

    }, function() {
        console.log('error fetching data');
});
}])
.controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory','$route','flashMessageService',
  function($scope, $log, pagesFactory, $route, flashMessageService) {
    pagesFactory.getAdminPages().then(
      function(response) {
        $scope.allPages = response.data;
      },
      function(err) {
        $log.error(err);
      }
    );

    $scope.deletePage = function(id) {
      pagesFactory.deletePage(id).then(
        function() {
          flashMessageService.setMessage("Page deleted Successfully");
          $route.reload();
        }
      );
    };

  }
])
.controller('AddEditPageCtrl', ['$scope', '$log', 'pagesFactory', '$routeParams', '$location', 'flashMessageService','$filter', function($scope, $log, pagesFactory, $routeParams, $location, flashMessageService, $filter) {
  $scope.pageContent = {};
  $scope.pageContent._id = $routeParams.id;
  $scope.heading = "Add a New Page";

  if ($scope.pageContent._id != 0) {
    $scope.heading = "Update Page";
    pagesFactory.getAdminPageContent($scope.pageContent._id).then(
        function(response) {
          $scope.pageContent = response.data;
          $log.info($scope.pageContent);
        },
        function(err) {
          $log.error(err);
        });
  }

  $scope.updateURL=function(){
    $scope.pageContent.url=$filter('formatURL')($scope.pageContent.title);
  }

  $scope.savePage = function() {
    pagesFactory.savePage($scope.pageContent).then(
      function() {
        flashMessageService.setMessage("Page Saved Successfully");
        $location.path('/admin/pages');
      },
      function() {
        $log.error('error saving data');
      }
    );
  };
}
])
.controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 'AuthService', 'flashMessageService',function($scope, $location, $cookies, AuthService, flashMessageService) {
  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.$on('user-created', function(event, userDetails) {
    $scope.login(userDetails);
  });

  $scope.login = function(credentials) {

    AuthService.login(credentials).then(
      function(res, err) {
        $cookies.put('loggedInUser', res.data);
        $location.path('/admin/pages');

      },
      function(err) {
        flashMessageService.setMessage(err.data);

        console.log(err);

    });
  };
}
]);