var RotView = Backbone.View.extend({
  el: "#canvas",
  name: null,
  data: null,
  point: null,
  start: function start(name, data, point) {
    if (!point) {
      point = 0;
    }
    this.name = name;
    this.data = data;
    this.point = point;
    this.$el.css("background-image", 'url("img/rot/' + name + '/' + point +
      '.jpg")');
  },
  changePoint: function changePoint(point) {
    this.point = point;
    this.$el.css("background-image", 'url("img/rot/' + this.name + '/' + point +
      '.jpg")');
  }
});
