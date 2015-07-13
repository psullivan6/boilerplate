define([
  'backbone',
  '../collections/client/ClientCollection',
  '../views/AppView'
], function (Backbone,
             ClientCollection,
             AppView){
  
  var MainRouter = Backbone.Router.extend({
    routes: {
      '': 'all',
      ':route': 'all',
      ':route/*parameters': 'all'
    },
    
    initialize: function () {
      _.bindAll(this, 'handleData');
      
      this.on('route:all', function (route, parameters) {
        this.handleData(route, parameters);
      });
    },
    
    handleData: function (route, parameters) {
      var thisContext = this;
      
      console.log('DATA', route, parameters);
    }
  });

  return MainRouter;
});