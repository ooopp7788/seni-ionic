angular.module('app.services', [])

  .factory('Msgs', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var msgs = [
      {
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
      }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 5,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }
    ];

    return {
      all: function () {
        return msgs;
      },
      remove: function (msg) {
        msgs.splice(msgs.indexOf(msg), 1);
      },
      get: function (msgId) {
        for (var i = 0; i < msgs.length; i++) {
          if (msgs[i].id === parseInt(msgId)) {
            return msgs[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Kinds',['$http','$rootScope',function ($http,$rootScope) {
    return {
      all: function(){
        return $http.post($rootScope.base + "/getallkind");
      }
    };
  }])

  .factory('Comments',['$http','$rootScope',function ($http,$rootScope) {
    return {
      get: function(resid,pagenum){
        var CommentUrl = $rootScope.base+'/commentpage?resid='+resid+'&pagenum='+pagenum;
        return $http.post(CommentUrl)
      },
      submit: function(resid,text){
        var SubmitUrl = $rootScope.base+'/PlayComment?resid='+resid+'&CommentText='+text;
        return $http.post(SubmitUrl)
      }
    };
}]);


