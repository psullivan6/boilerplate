define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var BaseView = Backbone.View.extend({
    
    initialize: function(){
      var thisContext = this;

      _.bindAll(this, 'render');

      this.subViews = [];
      this.cssOuterContent = 1600; // from `_variables.scss`
      this.cssInnerContent = 1200; // from `_variables.scss`
      this.cssGutter = 30; // from `_variables.scss`

      $(window).resize(function() {
        // [TODO] Make sure the values are returning what we want
        // for all devices (mobile esp.) Also put this in a place where it won't
        // be called a ton of times (aka everytime a BaseView is instantiated)
        var width = $(document).width();
        var height = $(window).height();

        thisContext.trigger(BaseView.WINDOW_RESIZE, {
          width: width,
          height: height,
          aspectRatio: width / height
        });
      });
    },

    addSubView: function(view){
      this.subViews.push(view);
    },

    cleanup: function(view){
      // remove view from the subViews array:
      this.subViews = _.without(this.subViews, view);

      // run the cleanup on all of this view's children if they exist:
      if (view.subViews.length) { view.cleanupAll(); }

      // empty the HTML contents, remove all classes, and stop listening for events
      view.$el.empty();
      // view.$el.removeClass();
      view.unbind();
      // view.$el.remove();
    },

    cleanupAll: function(){
      while(this.subViews.length > 0){
        this.cleanup(this.subViews[0]);
      }
    },

    addBodyClass: function(className){
      $('body').addClass(className);
    },

    render: function(){
      return this;
    }
  },
  {
    WINDOW_RESIZE: 'BaseView_WINDOW_RESIZE'
  });

  return BaseView;
});
