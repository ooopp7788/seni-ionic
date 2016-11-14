
angular.module('app', [
  'ionic',
  'app.controllers',
  'app.services',
  'app.directives',
  'app.filters',
  'ngAnimate',
  'ngCordova'//Cordova插件依赖
])

  .run(function ($cordovaDevice, $ionicPlatform, $rootScope, $timeout, $location, $ionicModal ,$http ,$cordovaStatusbar) {

    //ng全局变量：服务器url，登陆状态，个人信息
    $rootScope.base = "http://123.57.212.58:8012/edu";
    //$rootScope.base = "http://t9cloud.com";
    //$rootScope.base = "http://192.168.1.116:8080/seni_edu";
    $rootScope.loged = false;//登陆状态
    $rootScope.info = {};//个人信息

    //登陆Modal
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
    //End


    //cordova插件：statusBar
    $ionicPlatform.ready(function() {
      console.log(cordova,$cordovaStatusbar)
      if ($cordovaDevice.getPlatform().toLowerCase == 'android') {
        StatusBar.backgroundColorByHexString("#333");
      }else{
        $cordovaStatusbar.overlaysWebView(false);
        $cordovaStatusbar.style(1);
        StatusBar.styleLightContent();
        $cordovaStatusbar.styleColor('black');
      }
    });

    //路由改变start，判断msg页面登陆状态
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if ($location.path() == '/msg' && !$rootScope.loged) {
          event.preventDefault();
          $rootScope.openModal();
        }
    });

    //tabs隐藏，登陆状态检查
    $rootScope.$on('$stateChangeSuccess', function (evt, current, pre) {
      $timeout(function () {
        if ($location.path() == '/tab/idx' || $location.path() == '/tab/chats' || $location.path() == '/tab/account') {
          $rootScope.hidetabs = true;
        } else {
          $rootScope.hidetabs = false;
        }
      });
      if(!$rootScope.loged) {
        $http.get($rootScope.base+'/json/islogined').success(function (response) {
          console.log(response)
          if(response.code===1){
            $rootScope.loged=true;
            $rootScope.$emit('loged');
          }
          if(response.code===2)$rootScope.loged=false;
        })
      }
    });
  })

  //provider配置
  .config(function ($stateProvider, $sceDelegateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    //允许加载资源的域
    $httpProvider.defaults.withCredentials = true;

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://124.227.108.93:9001/**']);

      //路由配置
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
        url: '/sort/:kindone/:kindtwo',
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
      })

      .state('info', {
        url: '/info',
        templateUrl: 'templates/info.html',
        controller: 'InfoCtrl'
      })

      .state('reg', {
        url: '/reg',
        templateUrl: 'templates/reg.html',
        controller: 'RegCtrl'
      })

      .state('password', {
        url: '/password',
        templateUrl: 'templates/password.html',
        controller: 'PwCtrl'
      })

      .state('phone', {
        url: '/phone',
        templateUrl: 'templates/phone.html',
        controller: 'PhoneCtrl'
      })

      .state('t9cloud', {
        url: '/t9cloud',
        templateUrl: 'templates/t9cloud.html',
        controller: 'T9cloudCtrl'
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
