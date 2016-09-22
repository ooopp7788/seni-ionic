angular.module('app.directives', [])
	/*
	首页轮播图插件
	 */

	.directive('mjSlides', function(){
		return {
			restrict: 'EA',
			//replace: true,
			//template: '<div class="slide-content"></div>',
			link: function(scope, iele ,iattr) {

			}
		};
	})

		.directive('mjImg',function(){
			return {
				restrict: 'EA',
				//replace: true,
				template: '<div ng-init="idx=$index" ng-repeat="note in idxData.listnotes" class="img-container"><img alt="{{idx}}" class="slide-img" src="images/1-1.jpg" /></div>',
				link: function(scope, iele ,iattr){
					console.log(1)
				}
			}
		})

		.directive('mjCount',function(){
			return {
				restrict: 'EA',
				//replace: true,
				template: '<div class="count-btn"><span ng-repeat="note in idxData.listnotes"></span></div>',
				link: function(scope, iele ,iattr){

				}
			}
		})

  /*
  播放页面选项卡
   */
  .directive('mjTabs', function() {
      return {
          restrict: "EA",
          controller: function($scope){
            this.index = 0;
            this.setIdx = function(idx){
              this.index = idx;
              $scope.$broadcast('navClick');
            };
            this.getIdx = function(){
              return this.index;
            };
          }
      }
  })

    .directive('mjTabsNavs', function() {
        return {
            restrict: "EA",
            require: '?^mjTabs',
            link: function(scope,ele,attrs,parent){
              ele.children().on('click',function(){
                var $ele = angular.element(this);
                var idx = $ele.attr('data-index');
                $ele.parent().children().removeClass('current');
                $ele.addClass('current');
                parent.setIdx(idx);
              });
            }
        }
    })

    .directive('mjTabsViews', function() {
        return {
            restrict: "EA",
            require: '?^mjTabs',
            link: function(scope,ele,attrs,parent){
              scope.$on('navClick',function(){
                var idx = parent.getIdx();
                ele.children().addClass('inactive');
                console.log(ele)
                ele.children().eq(idx).removeClass('inactive');
              });
            }
        }
    })

  /*
  主页通知垂直轮播
   */
  .directive('mjVerticalSlider',function($interval,$timeout){
    return {
      restrict: 'EA',
      link: function(scope,iele,iattrs){
        var slideTime = scope.noteSlideTime;
        console.log(slideTime)
        var timeout1 = $timeout(function(){
          var index = 0;
          var element = iele.children().eq(0).clone();
          iele.append(element);
          scope.noteStyle={
            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
            '-webkit-transition-duration': '300ms'
          };
          var timer = $interval(function(){
            scope.noteStyle={
              '-webkit-transform': 'translate3d(0px,-'+(index+1)*40+'px,0px)',
              '-webkit-transition-duration': '300ms'
            };
            index++;
            if(index === iele.children().length){
              scope.noteStyle={
                '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transition-duration': '0ms'
              };
              var timeout2 = $timeout(function(){
                scope.noteStyle={
                  '-webkit-transform': 'translate3d(0px, -40px, 0px)',
                  '-webkit-transition-duration': '300ms'
                };
                index = 1;
                $timeout.cancel(timeout2);
              },200);
            }
          },slideTime);
          $timeout.cancel(timeout1);
        },500);
      }
    }
  })


.directive('mjFocus',function(){
  return {
    restrict: 'EA',
    link: function(scope,iele,iattrs){
      iele[0].focus()
    }
  }
})

.directive('ngEnter', function() {
  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter, {'event': event});
          });
          event.preventDefault();
        }
      });
    }
  }
});