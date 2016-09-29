angular.module('app.controllers', [])

  .controller('IdxCtrl',['$interval','$scope','$rootScope', '$http', '$timeout', '$ionicLoading','Kinds','$ionicSlideBoxDelegate', function ($interval, $scope, $rootScope, $http, $timeout, $ionicLoading, Kinds,$ionicSlideBoxDelegate) {
    $scope.loaded = false;
    $scope.noteSlideTime = 3000;//主页通知动画时间
    var getData = function(){
      $scope.loaded = false;
      $ionicLoading.show({
        template: '加载中 ..'
      });
      //轮播
      var getSlides = function (){
        $http.post($rootScope.base+"/json/homepics").success(function(data){
          console.log(data)
          $scope.slides = data;
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.$getByHandle('slideimgs').loop(true);
        }).then(function(){
          getNotes();
        });
      };
      //通知
      var getNotes = function () {
        $http.post($rootScope.base + "/json/notelist").success(function (data) {
          $scope.notes = data;
        }).then(function(){
          getNews();
        });
      };
      //最新视频
      var getNews = function (){
        $http.post($rootScope.base + "/json/newres").success(function (data) {
          $scope.news = data;
        }).then(function(){
          getOnekind();
        });
      };
      //导航分类
      var getOnekind = function (){
        Kinds.all().success(function (data) {
          $scope.kinds = data;
        }).then(function(){
          getHots();
        });
      };
      //最热视频
      var getHots = function (){
        $http.post($rootScope.base + "/json/hotres").success(function (data) {
          $scope.hots = data;
        }).then(function(){
          getLikes();
        });
      };
      //推荐视频
      var getLikes = function (){
        $http.post($rootScope.base + "/json/likes").success(function (data) {
          $scope.likes = data;
        }).then(function(){
          getFbs();
        });
      };
      //评论反馈
      var getFbs = function (){
        $http.post($rootScope.base + "/json/feedback").success(function (data) {
          $scope.feedbacks = data;
          $scope.loaded = true;
          $ionicLoading.hide();
        });
      };

      getSlides();
    };

    getData();
  }])

  .controller('CoursesCtrl',['$scope','Kinds', function ($scope,Kinds) {
    Kinds.all().success(function (data) {
      $scope.kinds =data;
    });
  }])

  .controller('ChatDetailCtrl',['$scope', '$stateParams', 'Chats', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  }])

  .controller('AccountCtrl',['$scope', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  }])

  .controller('SortCtrl',['$scope','$rootScope','$stateParams','Kinds', function ($scope,$rootScope,$stateParams,Kinds) {
    Kinds.one($stateParams.num).then(function (response) {
      $scope.title = response.name;//一级标题
      $scope.code = response.code;//一级分类code
      $scope.sorts = response.data;//二级分类list
      console.log(response.data)
    });
    Kinds.all().then(function (response) {
      console.log(response)
    });
    $scope.sortQurey = function (sortIndex,timeIndex) {
      console.log(sortIndex,timeIndex)

    };
    $scope.slideToggle = function (){
      if(!$scope.menuStyle) {
        $scope.menuStyle = {
          height : 0,
          opacity : 0,
        };
        $scope.arrowStyle = {

        }
      }else{
        $scope.menuStyle = undefined;
      }
    };
  }])

  .controller('PlayCtrl',['$scope','$rootScope','$state','$stateParams','$http','$ionicLoading', function ($scope, $rootScope,$state, $stateParams, $http, $ionicLoading) {
    $ionicLoading.show({
      template: '加载中 ..'
    });

    $scope.play = function (){
      $scope.poster = !1;
      document.getElementById('H5video').play();
    };

    $scope.resid = $stateParams.resid;
    var videoUrl = $rootScope.base+'/jsons/play?resid='+$scope.resid;
    $http.post(videoUrl).success(function (data) {
      $scope.videoPath = data.body.doop2filesRealPath;
      $scope.videoInfo = data.body.t9res;
      $scope.relates = data.body.listT9res;
      $ionicLoading.hide();
    });
  }])
  .controller('CommentCtrl',['$scope','$rootScope','Comments','$ionicLoading','$ionicPopup', function ($scope,$rootScope, Comments,$ionicLoading,$ionicPopup) {
    $ionicLoading.show({
      template: '加载中 ..'
    });
    $scope.commentsSubmit = function (){
      if(!$scope.text){
        $ionicPopup.alert({
          title: '评论为空！',
          template: '请输入文字后提交！'
        });
        return
      }
      Comments.submit($scope.resid,$scope.text).success(function (data) {
        if(data.code==111){
          console.log(data)
          $rootScope.openModal();
        }
      });
    };


    Comments.get($scope.resid,1).success(function(data){
      totalPage = data.totalPage;
      $scope.comments = data.content;
      $ionicLoading.hide();
    });
  }])

  .controller('SearchCtrl',['$scope','$rootScope','$http', function ($scope,$rootScope,$http) {
    document.getElementById('search').focus();
    $scope.searchSubmit = function (caption){
      console.log(caption,form.search.required)
      var searchUrl = $rootScope.base + '/json/json_search';
      $scope.showKeyword = !1;
      $http.post(searchUrl,{'caption':caption}).success(function (data) {
        console.log(data)
      })
    }
  }])

  .controller('MsgCtrl',['$scope', 'Msgs', function ($scope, Msgs) {
    $scope.msgs = Msgs.all();
    $scope.remove = function (msg) {
      Msgs.remove(msg);
    };
  }])

  .controller('SetCtrl',['$scope', 'Msgs', function ($scope, Msgs) {
    $scope.msgs = Msgs.all();
    $scope.remove = function (msg) {
      Msgs.remove(msg);
    };
  }])

  .controller('logCtrl',['$scope', '$rootScope', '$http', function ( $scope, $rootScope, $http) {
    $scope.login = {

    };
    $scope.code = $rootScope.base + '/Code';
    $scope.changeCode = function () {
      $scope.code = $rootScope.base + '/Code?=' + Math.random();
    };
    $scope.logSubmit = function (){
      var logUrl = $rootScope.base + '/waplogin';
      $http({
        url: logUrl,
        method: 'get',
        params: $scope.login,//params作为url的参数
      }).success(function (data) {
        alert(data)
        console.log(data)
      })
    };
  }])
;
