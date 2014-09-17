var MenuView = Backbone.View.extend({
  el: "#menu",
  start: function () {
    var that = this;
    this.$(".pfc-close-button").on(PfcApp.event, function () {
      that.hide(that);
    });
    _.each(["zoom", "rot"], function (section) {
      var $lineList = this.$("." + section + "-lines ul");
      _.each(LINES[section], function (line, name) {
        $lineList.append('<li class="' + name + '">' + name + '</li>');
      });
    }, this);
    this.$("li").on(PfcApp.event, function (e) {
      that.loadLine(e, that);
    });
  },
  hide: function hide(that) {
    that.$el.fadeOut("fast");
    PfcApp.blockEvents = false;
  },
  show: function show() {
    PfcApp.blockEvents = true;
    this.$el.fadeIn("fast");
  },
  loadLine: function loadLine(e, that) {
    var line = $(e.target).attr("class");
    var section = $(e.target).closest(".column").attr("class")
      .replace("column ", "").replace("-lines", "");
    that.hide(that);
    PfcApp.navigate(section + "/" + line, { trigger: true });
  }
});
