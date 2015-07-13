require.config({
  paths: {
    backbone   : 'libs/backbone/backbone',
    jquery     : 'libs/jquery/dist/jquery.min',
    text       : 'libs/requirejs-text/text',
    underscore : 'libs/underscore/underscore-min'
  }
});

require([
  'backbone',
  'js/routes/main'
], function(Backbone,
            MainRouter){
  
  var mainRouter = new MainRouter();
  
  Backbone.history.start();
});