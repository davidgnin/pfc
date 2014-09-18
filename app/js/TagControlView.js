var TagControlView = Backbone.View.extend({
  el: "#canvas .tag-layer",
  start: function () {
    var that = this;
    this.$el.on(PfcApp.event + ".marker-clicked", ".pfc-marker", function (e) {
      that.showTag(e, that);
    });
    if (PfcApp.event == "click") {
      this.$el.on("mouseenter.marker-clicked", ".pfc-marker", function (e) {
        that.showGlobe(e, that);
      });
    }
  },
  showTag: function showTag(e, that) {
    var tagId = $(e.target).attr("class").replace("pfc-marker tag-", "");
    PfcApp.showTag(tagId);
  },
  showGlobe: function showGlobe(e, that) {
    var tagId = $(e.target).attr("class").replace("pfc-marker tag-", "");
    var width = $("#canvas").width();
    var offset = $("#canvas").offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;
    var orientation, bottom, left;
    if (y < 80) bottom = true;
    if (width - x < 120) left = true;
    if (bottom && left) orientation = "bottom-left";
    else if (bottom && !left) orientation = "bottom";
    else if (!bottom && left) orientation = "left";
    else orientation = "right";
    $(e.target).append('<div class="pfc-globe ' + orientation +
      '"><span class="content">' + PfcApp.getTagName(tagId) + '</span></div>');
    $(e.target).on("mouseleave", function (e) {
      $(e.target).empty();
      $(e.target).off("mouseleave");
    });
  }
});
