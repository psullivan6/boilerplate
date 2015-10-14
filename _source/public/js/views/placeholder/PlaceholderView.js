define([
  'jquery',
  'underscore',
  '../BaseView',
  'text!templates/placeholder/PlaceholderTemplate.html'
], function($, _, BaseView,
            PlaceholderTemplate){
  
  var PlaceholderView = BaseView.extend({
    el: '#page',
    
    // It's the first function called when this view it's instantiated.
    initialize: function(options){
      _.bindAll(this, 'render');
      this.template = _.template(PlaceholderTemplate);
      
      this.page = options.page;
      
      // Call the initialize function of the extended BaseView
      BaseView.prototype.initialize.call(this);
    },
    
    render: function(){
      var thisContext = this;
      this.$el.html(thisContext.template({ page: this.page}));
    },
  });
  
  return PlaceholderView;
});