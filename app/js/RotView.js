var RotView = Backbone.View.extend({
  el: "#canvas",
  start: function start(name, data, point) {
    if (!point) {
      point = 0;
    }
    this.$el.css("background-image", 'url("img/rot/' + name + '/' + point +
      '.jpg")');
  }
});
