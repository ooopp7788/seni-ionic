// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic',
  'app.controllers',
  'app.services',
  'app.directives',
  'app.filters',
  'ngAnimate'
])

  .run(function ($ionicPlatform, $rootScope, $timeout, $location, $ionicModal ,$http) {
    //$rootScope.base = "http://123.57.212.58:8012/edu";
    //$rootScope.base = "http://t9cloud.com";
    $rootScope.base = "http://192.168.1.141:8080/seni_edu";

    $ionicModal.fromTemplateUrl('login.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $rootScope.modal = modal;
    });
    $rootScope.openModal = function () {
      $rootScope.modal.show()
    };
    $rootScope.closeModal = function () {
      $rootScope.modal.hide()
    };
    $rootScope.$on('$destroy', function() {
      $rootScope.modal.remove();
    });


    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });


    $rootScope.$on('$stateChangeSuccess', function (evt, current, pre) {
      $timeout(function () {
        if ($location.path() == '/tab/idx' || $location.path() == '/tab/chats' || $location.path() == '/tab/account') {
          $rootScope.hidetabs = true;
        } else {
          $rootScope.hidetabs = false;
        };
      })
    });
  })
  .config(function ($stateProvider, $sceDelegateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://124.227.108.93:9001/**']);
    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })


      .state('tab.idx', {
        url: '/idx',
        views: {
          'tab-idx': {
            templateUrl: 'templates/tab-idx.html',
            controller: 'IdxCtrl'
          }
        }
      })

      .state('tab.courses', {
        url: '/courses',
        views: {
          'tab-courses': {
            templateUrl: 'templates/tab-courses.html',
            controller: 'CoursesCtrl'
          }
        }
      })

      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('sort', {
        url: '/sort/:num',
        templateUrl: 'templates/sort.html',
        controller: 'SortCtrl'
      })

      .state('play', {
        url: '/play/:resid',
        //abstract: true,
        templateUrl: 'templates/play.html',
        controller: 'PlayCtrl'
      })
      .state('play.info', {
        templateUrl: 'templates/play-info.html'
      })
      .state('play.comment', {
        templateUrl: 'templates/play-comment.html',
        controller: 'CommentCtrl'
      })
      .state('play.related', {
        templateUrl: 'templates/play-related.html'
      })

      .state('search', {
        url: '/search',
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      })

      .state('msg', {
        url: '/msg',
        templateUrl: 'templates/msg.html',
        controller: 'MsgCtrl'
      })

      .state('setting', {
        url: '/setting',
        templateUrl: 'templates/setting.html',
        controller: 'SetCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('tab/idx');

    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('123').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('123').icon('ion-android-arrow-back');


    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

  });
