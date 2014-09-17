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
    this.$el.off("click.rotevent");
    this.$el.off("touchstart.rotevent");
    this.$el.off("touchend.rotevent");
    this.$(".aux-layer").off("click.rotevent");
    this.$(".aux-layer").off("touchstart.rotevent");
    this.$el.css("background-image", 'url("img/zoom/' + name + '/' + point +
      '.jpg")');
    this.$(".aux-layer").css({
      backgroundImage: 'url("img/zoom/' + name + '/' + point + '.jpg")',
      width: "auto",
      height: "auto",
      visibility: "hidden",
      top: "0%",
      left: "0%"
    });
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
    return this.parsedData;
  },
  changePoint: function changePoint(point) {
    var that = this;
    setTimeout(function () {
      that.$(".aux-layer").removeClass("mobile");
      that.$(".aux-layer").css({
        visibility: "hidden",
        backgroundImage: 'url("img/zoom/' + that.name + '/' + point + '.jpg")',
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%"
      });
      PfcApp.blockEvents = false;
    }, 500);

    var rel = this.parsedData[point].scale/this.parsedData[this.point].scale;
    var offset;
    if (rel > 1) {
      offset = (rel*100 - 100)/2;
      this.$(".aux-layer").addClass("mobile");
      this.$(".aux-layer").css({
        visibility: "visible",
        top: "-" + offset + "%",
        right: "-" + offset + "%",
        bottom: "-" + offset + "%",
        left: "-" + offset + "%"
      });
    } else {
      offset = ((this.parsedData[this.point].scale/
        this.parsedData[point].scale)*100 - 100)/2;
      this.$(".aux-layer").css({
        visibility: "visible",
        backgroundImage: 'url("img/zoom/' + this.name + '/' + point + '.jpg")',
        top: "-" + offset + "%",
        right: "-" + offset + "%",
        bottom: "-" + offset + "%",
        left: "-" + offset + "%"
      });
      setTimeout(function () {
        that.$(".aux-layer").addClass("mobile");
        that.$(".aux-layer").css({
          top: "0%",
          right: "0%",
          bottom: "0%",
          left: "0%"
        });
      }, 50);
    }

    this.point = point;
    this.$el.css("background-image", 'url("img/zoom/' + this.name + '/' +
      point + '.jpg")');
    return this.parsedData[point];
  }
});
