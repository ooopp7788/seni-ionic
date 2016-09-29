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

  .controller('AccountCtrl',['$scope','$rootScope','$http','$location', function ($scope,$rootScope,$http,$location) {
    var url = $rootScope.base + '/json/json_mystudying';
    $http.get(url).success(function (response) {
      console.log(response)
      $scope.studys = response
    });
    $rootScope.$on('loged',function (e,data) {
      console.log(e,data)
      if(data)$scope.info = data.body;
      $rootScope.loged = true;
      $http.get(url).success(function (response) {
        console.log(response)
        $scope.studys = response
      })
    });

    $scope.goInfo = function () {
      $location.path('/info')
    }
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

  .controller('PlayCtrl',['$scope','$rootScope','$state','$stateParams','$http', function ($scope, $rootScope,$state, $stateParams, $http) {
    $scope.resid = $stateParams.resid;

    $scope.play = function (){
      $scope.poster = !1;
      document.getElementById('H5video'+$scope.resid).play();
    };

    var videoUrl = $rootScope.base+'/jsons/play?resid='+$scope.resid;
    $http.post(videoUrl).success(function (data) {
      $scope.videoPath = data.body.doop2filesRealPath;
      $scope.videoInfo = data.body.t9res;
      $scope.relates = data.body.listT9res;
    });

    $scope.$on('$ionicView.leave', function() {
      document.getElementById('H5video'+$scope.resid).pause();
    });
  }])
  .controller('CommentCtrl',['$scope','$rootScope','Comments','$ionicLoading','$ionicPopup', function ($scope,$rootScope, Comments,$ionicLoading,$ionicPopup) {
    $scope.commentsSubmit = function (){
      if(!$scope.text){
        $ionicPopup.alert({
          title: '评论为空！',
          template: '请输入文字后提交！'
        });
        return
      }
      Comments.submit($scope.resid,$scope.text).success(function (data) {
        if(data.code===111){
          console.log(data)
          $rootScope.openModal();
        }
        if(data.code===222){
          console.log(data)
          $scope.loading = !0;
          $ionicPopup.alert({
            title: '评论成功！'
          });
          $scope.text ='';
          Comments.refresh($scope.resid,1).success(function(data){
            totalPage = data.totalPage;
            $scope.comments = data.content;
            $scope.loading = !1;
          });
        }
      });
    };

    Comments.get($scope.resid,1).success(function(data){
      totalPage = data.totalPage;
      $scope.comments = data.content;
      $scope.loading = !1;
    });
  }])

  .controller('SearchCtrl',['$scope','$rootScope','$http', function ($scope,$rootScope,$http) {
    document.getElementById('search').focus();
    $scope.keywords = ['电商','经济半小时','互联网','农产品'];

    $scope.searchSubmit = function (showState,caption){
      var searchUrl = $rootScope.base + '/json/json_search';

      if(showState.showKeyword)showState.showKeyword = !1;
      if(!showState.searching)showState.searching = !0;
      $http({
        url:searchUrl,
        method: 'get',
        params: {'caption':caption}
      }).success(function (data) {
        showState.searching = !1;
        $scope.courses = data;
        showState.result = !0;
        if(data.length==0){
          console.log(showState)
          showState.result = !1;
          showState.showKeyword = !0;
        }
      })
    }
  }])

  .controller('MsgCtrl',['$scope', 'Msgs', function ($scope, Msgs) {
    Msgs.all().success(function (response) {
      if(response.code == 200){
        console.log(response)
        $scope.msgs = response.body;
      }
    });
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

  .controller('InfoCtrl',['$scope', '$rootScope','$http','$location','$ionicPopup', function ($scope,$rootScope,$http,$location,$ionicPopup) {
    $scope.change = {};
    var url = $rootScope.base + '/update-student';
    $scope.changeName = function () {
      $ionicPopup.show({
        title: '修改名字', // String. 弹窗的标题。
        template: '<input ng-model="change.name" type="text"/>',
        scope: $scope,
        buttons: [{ //Array[Object] (可选)。放在弹窗footer内的按钮。
          text: '取消',
          type: 'button-default',
          onTap: function(e) {
          }
        }, {
          text: '保存',
          type: 'button-positive',
          onTap: function(e) {
            $http({
              url: url,
              method: 'get',
              params: {
                idname: $scope.change.name
              }
            }).success(function (res) {
              console.log(res)
              $rootScope.info.idname = $scope.change.name;
            });
          }
        }]
      })
    };

    $scope.changeSex = function () {
      $ionicPopup.show({
        title: '修改性别',
        template: '<p click-color class="popup-sex" ng-click="change.sex=1">男</p><p click-color class="popup-sex" ng-click="change.sex=2">女</p>',
        scope: $scope,
        buttons: [{ //Array[Object] (可选)。放在弹窗footer内的按钮。
          text: '取消',
          type: 'button-default',
          onTap: function(e) {
          }
        }, {
          text: '保存',
          type: 'button-positive',
          onTap: function(e) {
            $http({
              url: url,
              method: 'get',
              params: {
                sex: $scope.change.sex
              }
            }).success(function (res) {
              console.log(res)
              $rootScope.info.sex = $scope.change.sex;
            });
          }
        }]
      });
    };

    $scope.changeDpt = function () {
      $ionicPopup.show({
        title: '修改部门',
        template: '<input ng-model="change.dptname" type="text">',
        scope: $scope,
        buttons: [{ //Array[Object] (可选)。放在弹窗footer内的按钮。
          text: '取消',
          type: 'button-default',
          onTap: function(e) {
          }
        }, {
          text: '保存',
          type: 'button-positive',
          onTap: function(e) {
            $http({
              url: url,
              method: 'get',
              params: {
                dptname: $scope.change.dptname
              }
            }).success(function (res) {
              console.log(res)
              $rootScope.info.dptname = $scope.change.dptname;
            });
          }
        }]
      });
    };

    $scope.changePos = function () {
      $ionicPopup.show({
        title: '修改职位',
        template: '<input ng-model="change.poscode" type="text">',
        scope: $scope,
        buttons: [{ //Array[Object] (可选)。放在弹窗footer内的按钮。
          text: '取消',
          type: 'button-default',
          onTap: function(e) {
          }
        }, {
          text: '保存',
          type: 'button-positive',
          onTap: function(e) {
            $http({
              url: url,
              method: 'get',
              params: {
                dptname: $scope.change.poscode
              }
            }).success(function (res) {
              console.log(res)
              $rootScope.info.poscode = $scope.change.poscode;
            });
          }
        }]
      });
    };

    $scope.logout = function () {
      var url = $rootScope.base + '/logout';
      $http.get(url).success(function (res) {
        $rootScope.loged = false;
        $location.path('/');
      });
    };
  }])

  .controller('LogCtrl',['$scope', '$rootScope', '$http','$location','$ionicPopup', function ( $scope, $rootScope, $http,$location,$ionicPopup) {
    $scope.login = {

    };
    $scope.code = $rootScope.base + '/Code';
    $scope.changeCode = function () {
      $scope.code = $rootScope.base + '/Code?=' + Math.random();
    };
    $scope.logSubmit = function (){
      var logUrl = $rootScope.base + '/login';
      $http({
        url: logUrl,
        method: 'get',
        params: $scope.login,//params作为url的参数
      }).success(function (data) {
        if(data.code===111){
          $rootScope.modal.hide();
          $rootScope.info = data.body;
          $rootScope.$emit('loged',data);
        }
        if(data.code===222){
          $scope.code = $rootScope.base + '/Code?=' + Math.random();
          $ionicPopup.alert({
            title: '登陆失败',
            template: data.msg
          });
        }
      })
    };
  }])

  .controller('RegCtrl',['$scope', '$rootScope', '$http','$location','$ionicPopup', function ( $scope, $rootScope, $http,$location,$ionicPopup) {
    $scope.reg = {

    };
    $scope.code = $rootScope.base + '/Code';
    $scope.changeCode = function () {
      $scope.code = $rootScope.base + '/Code?=' + Math.random();
    };
    $scope.regSubmit = function (){
      var regUrl = $rootScope.base + '/reg';
      $http({
        url: regUrl,
        method: 'get',
        params: $scope.reg,//params作为url的参数
      }).success(function (data) {
        if(data.code===1){
          $ionicPopup.alert({
            title: '注册成功',
            template: '即将前往首页'
          }).then(function () {
            $location.path('#/tab/index')
          });
        }
        if(data.code===2){
          $scope.code = $rootScope.base + '/Code?=' + Math.random();
          $ionicPopup.alert({
            title: '注册失败',
            template: data.msg
          });
        }
      })
    };
  }])

  .controller('PwCtrl',['$scope', '$rootScope', '$http','$ionicHistory','$ionicPopup', function ( $scope, $rootScope, $http,$ionicHistory,$ionicPopup) {
    $scope.params = {};

    $scope.save = function () {
      var url = $rootScope.base + '/update-student-password';
      $http({
        url: url,
        method: 'post',
        params: $scope.params
      }).success(function (data) {
        if(data.code==1){
          $ionicPopup.alert({
            title: data.msg,
          }).then(function () {
            $ionicHistory.goBack();
          });
        }
        if(data.code==888){
          $ionicPopup.alert({
            title: data.msg,
          });
        }
      });
    }
  }])

  .controller('PhoneCtrl',['$scope', '$rootScope', '$http','$location','$ionicPopup', function ( $scope, $rootScope, $http,$location,$ionicPopup) {
    $scope.params = {};

    $scope.save = function () {
      var url = $rootScope.base + '/update-student-phone';
      $http({
        url: url,
        method: 'post',
        params: $scope.params
      }).success(function (data) {
        if(data.code==1){
          $ionicPopup.alert({
            title: data.msg,
          }).then(function () {
            $ionicHistory.goBack();
          });
        }
        if(data.code==888){
          $ionicPopup.alert({
            title: data.msg,
          });
        }
      });
    }
  }])
;
