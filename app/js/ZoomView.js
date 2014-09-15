var ZoomView = Backbone.View.extend({
  el: "#canvas",
  name: null,
  data: null,
  parsedData: [],
  point: null,
  start: function start(name, data, point) {
    if (!point) {
      point = 0;
    }
    this.name = name;
    this.data = data;
    this.point = point;
    this.$el.css("background-image", 'url("img/zoom/' + name + '/' + point +
      '.jpg")');
    _.each(["glass", "micro", "electro"], function (type) {
      if (data[type]) {
        _.each(data[type].scales, function (scale) {
          this.parsedData.push({
            scale: scale,
            type: type,
            source: data[type].source
          });
        }, this);
      }
    }, this);
    return this.parsedData[point];
  },
  changePoint: function changePoint(point) {
    this.point = point;
    this.$el.css("background-image", 'url("img/zoom/' + this.name + '/' + point +
      '.jpg")');
    return this.parsedData[point];
  }
});
