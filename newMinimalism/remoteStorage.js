(function() {
  var modules = [
    'config',
    'button',
    'ajax',
    'webfinger',
    'oauth',
    'session',
    'versioning',
    'sync',
    'controller'
  ];
  function require(script) {
    var s = document.createElement('script');
    s.setAttribute('src', script);
    document.head.appendChild(s);
  }
  window.exports = {};
  //require('http://browserid.org/include.js');
  for(var i in modules) {
    require('http://unhost.it/'+modules[i]+'.js');
  }

  function whenReady() {
    var scripts = document.getElementsByTagName('script');
    for(i in scripts) {
      if((new RegExp(exports.config.jsFileName+'$')).test(scripts[i].src)) {
        var options = (new Function('return ' + scripts[i].innerHTML.replace(/\n|\r/g, '')))();
        exports.controller.onLoad(options);
      }
    }
  }
  window.exports.checkReady = function() {
    for(var i in modules) {
      if(typeof(exports[modules[i]]) == 'undefined') {
        setTimeout("window.exports.checkReady();", 1000);
        console.log(modules[i]+': not ready');
        console.log('all systems: not go');
        return;
      } else {
        console.log(modules[i]+': ready');
      }
    }
    console.log('all systems: go');
    whenReady();
  }

  //FIXME: not use a timer here to wait for the scripts to load :)
  setTimeout("window.exports.checkReady();", 0);
})();
