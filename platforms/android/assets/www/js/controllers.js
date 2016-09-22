angular.module('starter.controllers', [])


  .controller('IdxCtrl', function ($scope, $http, $timeout, slideWrapper, FlyJSONP, NumLimits) {
    $scope.loaded = false;
    if(!$scope.idxData){
      $timeout(function () {
        $http.get("json/json-index.json").success(function (data) {
          NumLimits(4, [data.listNewT9res, data.listlikesT9res, data.reslistall]);
          NumLimits(3, [data.listnotes]);
          $scope.idxData = data;

          slideWrapper('slide-wrapper');
          $scope.loaded = true;
          console.log($scope.loaded, $scope.idxData)
        })
      }, 1000);
    }

    /*if(!$scope.idxData) {
     var serverUrl = 'http://123.57.76.20/json-index';
     FlyJSONP.post({
     url: serverUrl,
     success:function(data){
     console.log(data)
     NumLimits(4,[data.listNewT9res,data.listlikesT9res,data.reslistall]);
     NumLimits(3,[data.listnotes]);
     $scope.idxData = data;
     slideWrapper('slide-wrapper');
     $scope.$apply(function (data) {
     $scope.loaded = true;
     });
     console.log($scope.loaded,$scope.idxData)
     },
     error: function(err){
     $scope.loaded = true;
     console.log($scope.loaded)
     console.log(err)
     }
     })
     }*/
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('PlayCtrl', function ($scope, $stateParams) {
    console.log('PlayCtrl')
  })

  .controller('SearchCtrl', function ($scope,$ionicNavBarDelegate) {
    console.log('SearchCtrl');
    $ionicNavBarDelegate.showBar(false);
  })

  .controller('MsgCtrl', function () {
    console.log('MsgCtrl')
  })
;
