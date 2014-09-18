var TagControlView = Backbone.View.extend({
  el: "#canvas .tag-layer",
  start: function () {
    var that = this;
    this.$el.on(PfcApp.event, function (e) {
      that.showTag(e, that);
    });
  },
  showTag: function showTag(e, that) {
    var tagId = $(e.target).attr("class").replace("pfc-marker tag-", "");
    PfcApp.showTag(tagId);
  }
});
