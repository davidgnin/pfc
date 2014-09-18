var RotView = Backbone.View.extend({
  el: "#canvas",
  name: null,
  data: null,
  point: null,
  zoomed: false,
  loaded: [],
  cancelClick: false,
  touchEvent: null,
  start: function start(name, data, point) {
    if (!point) {
      point = 0;
    }
    this.name = name;
    this.data = data;
    this.point = point;
    this.$el.css("background-image", 'url("img/rot/' + name + '/' + point +
      '.jpg")');
    this.$(".aux-layer").css({
      backgroundImage: 'url("img/rot/' + name + '/' + point + '.jpg")',
      width: "100%",
      height: "100%"
    });
    var that = this;
    if (PfcApp.event == "touchstart") {
      this.$el.on("touchstart.rotevent", function (e) {
        e.preventDefault();
        that.touchEvent = e;
      });
      this.$el.on("touchend.rotevent", function (e2) {
        e2.preventDefault();
        that.switchStatus(that.touchEvent, that);
      });
    } else {
      this.$el.on("click.rotevent", function (e) {
        that.switchStatus(e, that);
      });
    }
    var event = "mousedown";
    if (PfcApp.event == "touchstart") {
      event = "touchstart";
    }
    this.$(".aux-layer").on(event + ".rotevent", function (e) {
      that.dragBehaviour(e, that);
    });
  },
  changePoint: function changePoint(point) {
    this.point = point;
    this.$el.css("background-image", 'url("img/rot/' + this.name + '/' + point +
      '.jpg")');
    if (this.zoomed) {
      if (this.loaded[point]) {
        this.$(".aux-layer").css("background-image", 'url("img/rot/' +
          this.name + '/partials/' + point + '.jpg")');
        PfcApp.blockEvents = false;
      } else {
        this.$(".aux-layer").css("background-image", 'url("img/rot/' +
          this.name + '/' + point + '.jpg")');
        var myPreloader = ImgPreloader([{
          url: "img/rot/" + this.name + "/partials/" + point + ".jpg"
        }]);
        myPreloader.start();
        var that = this;
        var interval = setInterval(function () {
          if (myPreloader.preloaded()) {
            clearInterval(interval);
            that.$(".aux-layer").css("background-image", 'url("img/rot/' +
              that.name + '/partials/' + point + '.jpg")');
            that.loaded[point] = true;
            PfcApp.blockEvents = false;
          }
        }, 50);
      }
    } else {
      this.$(".aux-layer").css("background-image", 'url("img/rot/' + this.name +
        '/' + point + '.jpg")');
      PfcApp.blockEvents = false;
    }
  },
  switchStatus: function switchStatus(e, that) {
    e.preventDefault();
    var $target = $(e.target);
    if ($target.attr("id") == "canvas") {
      PfcApp.switchRotTags(true);
      var myPreloader = ImgPreloader([{
        url: "img/rot/" + that.name + "/partials/" + that.point + ".jpg"
      }]);
      myPreloader.start();
      var offsetX, offsetY;
      if (PfcApp.event == "touchstart") {
        offsetX = (e.originalEvent.touches[0].pageX -
          $("#canvas").offset().left)*3;
        offsetY = (e.originalEvent.touches[0].pageY -
          $("#canvas").offset().top)*3;
      } else {
        offsetX = (e.pageX - $("#canvas").offset().left)*3;
        offsetY = (e.pageY - $("#canvas").offset().top)*3;
      }
      var left = that.$el.width()/2 - offsetX;
      var top = that.$el.height()/2 - offsetY;
      if (left > 0) left = 0;
      if (top > 0) top = 0;
      if (left < -that.$el.width()*2) left = -that.$el.width()*2;
      if (top < -that.$el.height()*2) top = -that.$el.height()*2;
      that.$(".aux-layer").addClass("mobile");
      that.$(".aux-layer").css({
        visibility: "visible",
        width: "300%",
        height: "300%",
        left: left + "px",
        top: top + "px"
      });
      setTimeout(function () {
        that.$(".aux-layer").removeClass("mobile");
        if (myPreloader.preloaded()) {
          that.$(".aux-layer").css("background-image", 'url("img/rot/' +
            that.name + '/partials/' + that.point + '.jpg")');
          that.loaded[that.point] = true;
        } else {
          PfcApp.loadingLayer.show();
          var interval = setInterval(function () {
            PfcApp.loadingLayer.update(myPreloader.percentage());
            if (myPreloader.preloaded()) {
              clearInterval(interval);
              that.$(".aux-layer").css("background-image", 'url("img/rot/' +
                that.name + '/partials/' + that.point + '.jpg")');
              PfcApp.loadingLayer.hide();
              that.loaded[that.point] = true;
            }
          }, 50);
        }
        that.zoomed = true;
      }, 500);
    } else if ($target.hasClass("aux-layer")) {
      if (that.cancelClick) {
        that.cancelClick = false;
      } else {
        PfcApp.switchRotTags();
        that.$(".aux-layer").addClass("mobile");
        that.$(".aux-layer").css({
          backgroundImage: 'url("img/rot/' + that.name + '/' + that.point +
            '.jpg")',
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px"
        });
        setTimeout(function () {
          that.$(".aux-layer").removeClass("mobile");
          that.$(".aux-layer").css("visibility", "hidden");
          that.zoomed = false;
        }, 500);
      }
    }
  },
  dragBehaviour: function dragBehaviour(e, that) {
    e.preventDefault();
    var top = parseFloat(that.$(".aux-layer").css("top").replace("px", ""), 10);
    var left = parseFloat(that.$(".aux-layer").css("left").replace("px", ""),
      10);
    var limitTop = -1*(that.$el.height()*2);
    var limitLeft = -1*(that.$el.width()*2);
    var origTop, origLeft;
    if (PfcApp.event == "touchstart") {
      origTop = e.originalEvent.touches[0].pageY;
      origLeft = e.originalEvent.touches[0].pageX;
    } else {
      origTop = e.pageY;
      origLeft = e.pageX;
    }
    var eventMove = "mousemove";
    var eventUp = "mouseup";
    if (PfcApp.event == "touchstart") {
      eventMove = "touchmove";
      eventUp = "touchend";
    }
    $(document).on(eventMove + ".dragrot", function (e2) {
      e2.preventDefault();
      that.cancelClick = true;
      var newTop, newLeft;
      if (PfcApp.event == "touchstart") {
        newTop = top + (e2.originalEvent.touches[0].pageY - origTop);
        newLeft = left + (e2.originalEvent.touches[0].pageX - origLeft);
      } else {
        newTop = top + (e2.pageY - origTop);
        newLeft = left + (e2.pageX - origLeft);
      }
      if (newTop > 0) newTop = 0;
      if (newTop < limitTop) newTop = limitTop;
      if (newLeft > 0) newLeft = 0;
      if (newLeft < limitLeft) newLeft = limitLeft;
      that.$(".aux-layer").css({
        top: newTop + "px",
        left: newLeft + "px"
      });
    });
    $(document).on(eventUp + ".dragrot", function (e3) {
      e3.preventDefault();
      $(document).off(eventMove + ".dragrot");
      $(document).off(eventUp + ".dragrot");
    });
  }
});
