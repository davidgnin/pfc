var LoadingLayerView = Backbone.View.extend({
  el: "#loading-layer",
  show: function show() {
    this.$(".value").text(0);
    this.$el.show();
  },
  hide: function hide() {
    this.$el.hide();
  },
  update: function update(newValue) {
    this.$(".value").text(Math.round(newValue));
  }
});
