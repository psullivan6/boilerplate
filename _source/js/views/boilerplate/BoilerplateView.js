define([
  'jquery',
  'underscore',
  '../BaseView',
  './BoilerplateItemView',
  'text!templates/_boilerplate/BoilerplateTemplate.html'
], function($, _, BaseView,
            BoilerplateItemView,
            BoilerplateTemplate){
  
  var BoilerplateView = BaseView.extend({
    el: '#page',
    
    // It's the first function called when this view it's instantiated.
    initialize: function(){
      _.bindAll(this, 'render');
      this.template = _.template(BoilerplateTemplate);
      
      // Call the initialize function of the extended BaseView
      BaseView.prototype.initialize.call(this);
    },
    
    addAll: function(){
      this.cleanupAll();
      
      for (var i = 0, collectionLength = this.collection.models.length; i < collectionLength; i++) {
        model = this.collection.models[i];
        this.addOne(model);
      };
    },
    
    addOne: function(item){
      var boilerplateItemView = new BoilerplateItemView({
        model: item
      });
      
      // Add the view instantiated above to the sub view array:
      this.addSubView(boilerplateItemView);
      
      // render the sub view and append it to this parent view's DOM element
      boilerplateItemView.render();
      this.$el.append(boilerplateItemView.el);
    },
    
    render: function(){
      var thisContext = this;
      
      this.$el.html(thisContext.template());
      this.addAll();
    },
  });
  
  return BoilerplateView;
});