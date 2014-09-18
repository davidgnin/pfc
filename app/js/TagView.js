var TagView = Backbone.View.extend({
  el: "#tag",
  tag: null,
  start: function () {
    var that = this;
    this.$(".pfc-close-button").on(PfcApp.event, function () {
      that.hide(that);
    });
    this.$(".delete-button").on(PfcApp.event, function () {
      if (confirm("Vols esborrar aquesta etiqueta?")) {
        that.hide(that);
        PfcApp.deleteTag(that.tag);
      }
    });
    this.$(".edit-button").on(PfcApp.event, function () {
      that.hide(that);
      PfcApp.showNewTag(that.tag);
    });
  },
  hide: function hide(that) {
    that.$el.fadeOut("fast");
    PfcApp.blockEvents = false;
  },
  show: function show(tag) {
    PfcApp.blockEvents = true;
    this.tag = tag;
    this.$(".name").text(tag.get("name"));
    this.$(".description").text(tag.get("description"));
    this.$el.fadeIn("fast");
  }
});
