define([
  'backbone',
  '../views/_boilerplate/BoilerplateView'
], function (Backbone, BoilerplateView){

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

      this.placeholderView = new BoilerplateView({ page: route });
      this.placeholderView.render();

      console.log('DATA', route, parameters);
    }
  });

  return MainRouter;
});