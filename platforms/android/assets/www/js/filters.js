angular.module('app.filters', [])
  .filter('videoTime',function(){
    return function(input){
      var hh = parseInt(input/3600);
      var mm = parseInt(input/60%60);
      var ss = parseInt(input%60);
      if(hh<10){
        hh = '0'+hh;
      }if(mm<10){
        mm = '0'+mm;
      }if(ss<10){
        ss = '0'+ss;
      }
      var res = hh+':'+mm+':'+ss;
      return res;
    }
  })

  .filter('msgType',function () {
    return function (input) {
      if(input==1)return '系统消息：';
      if(input==2)return '班级消息：';
    }
  })

  .filter('sex',function () {
    return function (input) {
      if(input==1)return '男';
      if(input==2)return '女';
    }
  });