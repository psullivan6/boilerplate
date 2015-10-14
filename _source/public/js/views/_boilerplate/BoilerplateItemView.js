define([
  'jquery',
  'underscore',
  '../BaseView',
  'text!templates/_boilerplate/BoilerplateItemTemplate.html'
], function($, _, BaseView,
            BoilerplateItemTemplate){
  
  var BoilerplateItemView = BaseView.extend({
    el: '#page',
    
    // It's the first function called when this view it's instantiated.
    initialize: function(){
      _.bindAll(this, 'render');
      this.template = _.template(BoilerplateItemTemplate);
      
      // Call the initialize function of the extended BaseView
      BaseView.prototype.initialize.call(this);
    },
    
    render: function(){
      var thisContext = this;
      this.$el.html(thisContext.template());
    },
  });
  
  return BoilerplateItemView;
});