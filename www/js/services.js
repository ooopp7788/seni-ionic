angular.module('app.services', [])

  .factory('Msgs',['$http','$rootScope',function ($http,$rootScope) {
    var msgs ;
    return {
      all: function () {
        var url = $rootScope.base+'/json-mymsg';
        if(msgs)return msgs;
        msgs = $http.get(url);
        return msgs;
      },
      remove: function (id,index) {
        msgs.splice(msgs.indexOf(index), 1);
      },
      refresh: function () {
        var url = $rootScope.base+'/json-mymsg';
        msgs = $http.get(url);
        return msgs;
      }
    };
  }])

  .factory('Kinds',['$http','$rootScope',function ($http,$rootScope) {
    return {
      all: function(){
        return $http.post($rootScope.base + "/getallkind");
      },
      one: function(num){
        return $http.post($rootScope.base + "/getallkind").then(function(response){
          return {
            code: response.data[num].t9reskinds.code,
            name: response.data[num].t9reskinds.name,
            data:response.data[num].list_ResKinds
          }
        });
      }
    };
  }])

  .factory('Comments',['$http','$rootScope',function ($http,$rootScope) {
    var cache ;
    return {
      get: function(resid,pagenum){
        if(cache)return cache;
        var CommentUrl = $rootScope.base+'/commentpage?resid='+resid+'&pagenum='+pagenum;
        cache = $http.post(CommentUrl);
        return $http.post(CommentUrl)
      },
      refresh: function(resid,pagenum){
        var CommentUrl = $rootScope.base+'/commentpage?resid='+resid+'&pagenum='+pagenum;
        return $http({
          method: 'post',
          url: CommentUrl,
          headers: {'Cache-Control':'no-cache'}
        })
      },
      submit: function(resid,text){
        var SubmitUrl = $rootScope.base+'/PlayComment?resid='+resid+'&CommentText='+text;
        return $http.post(SubmitUrl)
      }
    };
}]);


