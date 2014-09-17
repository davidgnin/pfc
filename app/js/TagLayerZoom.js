var TagLayerZoom = Backbone.View.extend({
  el: "#canvas .tag-layer",
  data: null,
  fastList: [],
  start: function (data) {
    this.$el.empty();
    this.data = data;
  },
  hideMarkers: function hideMarkers() {
    var that = this;
    this.$el.fadeOut("fast", function () {
      that.$el.empty();
    });
  },
  showMarkers: function (newScale) {
    var markers = PfcApp.markers.filter(function (marker) {
      return marker.get("from") <= PfcApp.point && marker.get("to") >= PfcApp.point;
    });
    this.fastList = [];
    var that = this;
    _.each(markers, function (marker) {
      var mult = newScale/that.data[marker.get("point")].scale;
      var offX = (800*mult - 800)/2;
      var offY = (600*mult - 600)/2;
      var iX = marker.get("x")*mult - offX;
      var iY = marker.get("y")*mult - offY;
      if (iX >= 0 && iX <= 800 && iY >= 0 && iY <= 600) {
        that.fastList.push({
          tagId: marker.get("tagId"),
          x: iX,
          y: iY
        });
        that.drawMarker(marker.get("tagId"), iX, iY, that);
      }
    });
    this.$el.fadeIn("fast");
  },
  drawMarker: function drawMarker(tagId, iX, iY, that) {
    var cords = PfcApp.norm(iX, iY);
    that.$el.append('<div class="pfc-marker tag-' + tagId + '"></div>');
    that.$(".pfc-marker.tag-" + tagId).css({
      top: cords.y + "px",
      left: cords.x + "px"
    });
  },
  fastReShow: function fastReshow() {
    this.$el.empty();
    var that = this;
    _.each(this.fastList, function (marker) {
      that.drawMarker(marker.tagId, marker.x, marker.y, that);
    });
  }
});
