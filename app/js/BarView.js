BarView = Backbone.View.extend({
  el: "#bar",
  events: {
    "click .menu-button": "showMenu",
    "click .plus-button": "goPlus",
    "click .minus-button": "goMinus"
  },
  showMenu: function showMenu() {
    PfcApp.showMenu();
  },
  goPlus: function goPlus() {
    var point = parseInt(PfcApp.point, 10);
    var photos = parseInt(PfcApp.photos, 10);
    var zoomMode = $("#wrapper").hasClass("zoom-mode");
    var newPoint = point + 1;
    if (newPoint == photos && !zoomMode) {
      newPoint = 0;
      PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint, { trigger: true });
    } else if (newPoint < photos) {
      PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint, { trigger: true });
    }
  },
  goMinus: function goMinus() {
    var point = parseInt(PfcApp.point, 10);
    var photos = parseInt(PfcApp.photos, 10);
    var zoomMode = $("#wrapper").hasClass("zoom-mode");
    var newPoint = point - 1;
    if (newPoint < 0 && !zoomMode) {
      newPoint = photos - 1;
      PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint, { trigger: true });
    } else if (newPoint >= 0) {
      PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint, { trigger: true });
    }
  },
  updateBar: function updateBar(percent) {
    this.$(".bar-fill").css("width", percent + "%");
  },
  updateInfo: function updateInfo(info) {
    if (!info.scale) {
      this.$(".scale-value").empty();
    } else {
      this.$(".scale-value").text(info.scale + "x");
    }
    this.$(".source-button").attr("class", "button informative source-button " +
      info.source);
    this.$(".type-button").attr("class", "button informative type-button " +
      info.type);
  }
});
