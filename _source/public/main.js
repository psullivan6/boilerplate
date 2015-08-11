require.config({
  baseUrl: '_source/public',
  paths: {
    backbone :   'libs/backbone/backbone',
    jquery :     'libs/jquery/dist/jquery.min',
    text :       'libs/requirejs-text/text',
    underscore : 'libs/underscore/underscore-min'
  },
  name: 'main',
  dir: 'release/public'
});

require([
  'backbone',
  'js/routes/main'
], function(Backbone,
            MainRouter){
  
  var mainRouter = new MainRouter();
  
  Backbone.history.start();
});