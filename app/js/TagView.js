var TagView = Backbone.View.extend({
  el: "#tag",
  start: function () {
    var that = this;
    this.$(".pfc-close-button").on(PfcApp.event, function () {
      that.hide(that);
    });
  },
  hide: function hide(that) {
    that.$el.fadeOut("fast");
    PfcApp.blockEvents = false;
  },
  show: function show(tag) {
    PfcApp.blockEvents = true;
    this.$(".name").text(tag.get("name"));
    this.$(".description").text(tag.get("description"));
    this.$el.fadeIn("fast");
  }
});
