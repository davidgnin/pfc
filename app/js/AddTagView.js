var AddTagView = Backbone.View.extend({
  el: "#add-tag",
  start: function () {
    var that = this;
    this.$el.on(PfcApp.event, function (e) {
      if ($(e.target).attr("id") == "add-tag") {
        that.jumpTo(e, that);
      }
    });
    var event = "mousedown";
    if (PfcApp.event == "touchstart") {
      event = "touchstart";
    }
    this.$(".moving-marker").on(event + ".markerevent", function (e) {
      that.dragBehaviour(e, that);
    });
    this.$(".back-button").on(PfcApp.event, function () {
      that.$el.fadeOut("fast");
      $(".tag-layer").css("opacity", "1");
      that.marker = null;
      PfcApp.backNewTag();
    });
    this.$(".confirm-button").on(PfcApp.event, function () {
      that.saveTag(that);
    });
  },
  show: function (marker) {
    if (marker) {
      this.marker = marker;
      var norm = PfcApp.norm(marker.get("x"), marker.get("y"));
      this.$(".moving-marker").css({
        top: norm.y + "px",
        left: norm.x + "px"
      });
    } else {
      this.$(".moving-marker").css({
        top: this.$el.height()/2 + "px",
        left: this.$el.width()/2 + "px"
      });
    }
    this.$el.fadeIn("fast");
    $(".tag-layer").css("opacity", "0.5");
  },
  jumpTo: function jumpTo(e, that) {
    e.preventDefault();
    var newLeft, newTop;
    if (PfcApp.event == "touchstart") {
      newLeft = e.originalEvent.touches[0].pageX -
        that.$el.offset().left;
      newTop = e.originalEvent.touches[0].pageY -
        that.$el.offset().top;
    } else {
      newLeft = e.pageX - that.$el.offset().left;
      newTop = e.pageY - that.$el.offset().top;
    }
    that.$(".moving-marker").css({
      top: newTop + "px",
      left: newLeft + "px"
    });
  },
  dragBehaviour: function dragBehaviour(e, that) {
    e.preventDefault();
    var limitTop = that.$el.height();
    var limitLeft = that.$el.width();
    var top = parseInt(that.$(".moving-marker").css("top").replace("px", ""),
      10);
    var left = parseInt(that.$(".moving-marker").css("left").replace("px", ""),
      10);
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
    $(document).on(eventMove + ".dragmarker", function (e2) {
      e2.preventDefault();
      var newTop, newLeft;
      if (PfcApp.event == "touchstart") {
        newTop = top + (e2.originalEvent.touches[0].pageY - origTop);
        newLeft = left + (e2.originalEvent.touches[0].pageX - origLeft);
      } else {
        newTop = top + (e2.pageY - origTop);
        newLeft = left + (e2.pageX - origLeft);
      }
      if (newTop < 0) newTop = 0;
      if (newTop > limitTop) newTop = limitTop;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > limitLeft) newLeft = limitLeft;
      that.$(".moving-marker").css({
        top: newTop + "px",
        left: newLeft + "px"
      });
    });
    $(document).on(eventUp + ".dragmarker", function (e3) {
      e3.preventDefault();
      $(document).off(eventMove + ".dragmarker");
      $(document).off(eventUp + ".dragmarker");
    });
  },
  saveTag: function saveTag(that) {
    var top = parseInt(that.$(".moving-marker").css("top").replace("px", ""),
      10);
    var left = parseInt(that.$(".moving-marker").css("left").replace("px", ""),
      10);
    PfcApp.saveTag({ top: top, left: left }, that.marker);
    that.$el.fadeOut("fast");
    $(".tag-layer").css("opacity", "1");
    that.marker = null;
  }
});
