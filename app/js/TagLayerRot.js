var TagLayerRot = Backbone.View.extend({
  el: "#canvas",
  fastList: [],
  ampli: 1,
  start: function () {
    this.$(".tag-layer").empty();
  },
  showMarkers: function (newPoint) {
    this.$(".tag-layer").empty();
    var markers = PfcApp.markers.where({
      point: newPoint
    });
    this.fastList = [];
    var that = this;
    _.each(markers, function (marker) {
      that.fastList.push({
        tagId: marker.get("tagId"),
        x: marker.get("x"),
        y: marker.get("y")
      });
      that.drawMarker(marker.get("tagId"), marker.get("x"), marker.get("y"),
        that);
    });
  },
  drawMarker: function drawMarker(tagId, iX, iY, that) {
    var cords = PfcApp.norm(iX, iY);
    that.$(".tag-layer").append('<div class="pfc-marker tag-' + tagId + '"></div>');
    that.$(".pfc-marker.tag-" + tagId).css({
      top: cords.y*that.ampli + "px",
      left: cords.x*that.ampli + "px"
    });
  },
  fastReShow: function fastReshow() {
    this.$(".tag-layer").empty();
    var that = this;
    _.each(this.fastList, function (marker) {
      that.drawMarker(marker.tagId, marker.x, marker.y, that);
    });
  },
  switchTags: function switchTags(ampli) {
    this.$(".tag-layer").hide();
    if (ampli) {
      this.ampli = 3;
      this.$(".aux-layer").append(this.$(".tag-layer"));
    } else {
      this.ampli = 1;
      this.$el.append(this.$(".tag-layer"));
    }
    this.fastReShow();
    var that = this;
    setTimeout(function () {
      that.$(".tag-layer").show();
    }, 500); 
  }
});
