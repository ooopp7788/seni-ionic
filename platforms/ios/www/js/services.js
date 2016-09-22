angular.module('starter.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [
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
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })


  /*
   跨域请求FLYJSONP
   */
  .factory('FlyJSONP', [
    function () {
      var FlyJSONP = function (e) {
        var c, l, i, j, m, g, n, o, k;
        l = function (a, b, c) {
          a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
        };
        i = function (a, b) {
          c.log("Garbage collecting!");
          b.parentNode.removeChild(b);
          e[a] = void 0;
          try {
            delete e[a]
          } catch (p) {
          }
        };
        j = function (a, b) {
          var c = "", d, f;
          for (d in a)a.hasOwnProperty(d) && (d = b ? encodeURIComponent(d) : d, f = b ? encodeURIComponent(a[d]) : a[d], c += d + "=" + f + "&");
          return c.replace(/&$/, "")
        };
        m = function () {
          for (var a = "", a = [], b = 0, b = 0; b < 32; b += 1)a[b] = "0123456789ABCDEF".substr(Math.floor(Math.random() *
            16), 1);
          a[12] = "4";
          a[16] = "0123456789ABCDEF".substr(a[16] & 3 | 8, 1);
          return a = "flyjsonp_" + a.join("")
        };
        g = function (a, b) {
          c.log(b);
          typeof a !== "undefined" && a(b)
        };
        n = function (a, b) {
          c.log("GET success");
          typeof a !== "undefined" && a(b);
          c.log(b)
        };
        o = function (a, b) {
          c.log("POST success");
          typeof a !== "undefined" && a(b);
          c.log(b)
        };
        k = function (a) {
          c.log("Request complete");
          typeof a !== "undefined" && a()
        };
        c = {options: {debug: !1}};
        c.init = function (a) {
          var b;
          c.log("Initializing!");
          for (b in a)a.hasOwnProperty(b) && (c.options[b] = a[b]);
          c.log("Initialization options");
          c.log(c.options);
          return !0
        };
        c.log = function (a) {
          e.console && c.options.debug && e.console.log(a)
        };
        c.get = function (a) {
          var a = a || {}, b = a.url, p = a.callbackParameter || "callback", d = a.parameters || {}, f = e.document.createElement("script"), h = m(), q = "?";
          if (!b)throw Error("URL must be specified!");
          d[p] = h;
          b.indexOf("?") >= 0 && (q = "&");
          b += q + j(d, !0);
          e[h] = function (b) {
            typeof b === "undefined" ? g(a.error, "Invalid JSON data returned") : a.httpMethod === "post" ? (b = b.query.results, !b || !b.postresult ? g(a.error, "Invalid JSON data returned") :
              (b = b.postresult.json ? b.postresult.json : b.postresult, o(a.success, b))) : n(a.success, b);
            i(h, f);
            k(a.complete)
          };
          c.log("Getting JSONP data");
          f.setAttribute("src", b);
          e.document.getElementsByTagName("head")[0].appendChild(f);
          l(f, "error", function () {
            i(h, f);
            k(a.complete);
            g(a.error, "Error while trying to access the URL")
          })
        };
        c.post = function (a) {
          var a = a || {}, b = a.url, e = a.parameters || {}, d = {};
          if (!b)throw Error("URL must be specified!");
          b = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent('select * from jsonpost where url="' +
              b + '" and postdata="' + j(e, !1) + '"') + "&format=json&env=" + encodeURIComponent("store://datatables.org/alltableswithkeys");
          d.url = b;
          d.httpMethod = "post";
          if (typeof a.success !== "undefined")d.success = a.success;
          if (typeof a.error !== "undefined")d.error = a.error;
          if (typeof a.complete !== "undefined")d.complete = a.complete;
          c.get(d)
        };
        return c
      }(window);

      return FlyJSONP;
    }
  ])

  .factory('NumLimits', [
    function () {
      var NumLimits = function (num, arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          arr[i].splice(4, arr[i].length - 4);
        }
        return arr;
      };
      return NumLimits;
    }
  ])

  .factory('slideWrapper',[
    function(){
      var slideWrapper = function(id){
        var step=0;
        var ele= angular.element(document.getElementById(id));
        setInterval(function () {
          ele.find("li").css({"display": "none", "opacity": 0});
          console.log(ele.find("li"))
          step++;
          step = step % 5;
          ele.find("li").eq(step).css({"display": "block", "opacity": 1});
          console.log(document.getElementById(id), ele.find("li").css("display"));
        },3000);
        return null;
      };
      return slideWrapper;
    }
  ])
;
