var MenuView = Backbone.View.extend({
  el: "#menu",
  events: {
    "click .pfc-close-button": "hideMenu",
    "click li": "loadLine"
  },
  start: function () {
    _.each(["zoom", "rot"], function (section) {
      var $lineList = this.$("." + section + "-lines ul");
      _.each(LINES[section], function (line, name) {
        $lineList.append('<li class="' + name + '">' + name + '</li>');
      });
    }, this);
  },
  hideMenu: function hideMenu() {
    this.$el.fadeOut("fast");
  },
  showMenu: function showMenu() {
    this.$el.fadeIn("fast");
  },
  loadLine: function loadLine(e) {
    var line = $(e.target).attr("class");
    var section = $(e.target).closest(".column").attr("class")
      .replace("column ", "").replace("-lines", "");
    this.hideMenu();
    PfcApp.navigate(section + "/" + line, { trigger: true });
  }
});
