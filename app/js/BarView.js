BarView = Backbone.View.extend({
  el: "#bar",
  events: {
    "click .menu-button": "showMenu"
  },
  showMenu: function showMenu() {
    PfcApp.showMenu();
  }
});
