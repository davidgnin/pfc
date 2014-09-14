var PfcApp = new (Backbone.Router.extend({
  start: function startPfcApp() {
    this.menu = new MenuView();
    this.menu.start();
    this.bar = new BarView();
    Backbone.history.start();
  },
  routes: {
    "zoom/:line(/:point)": "loadZoom",
    "rot/:line(/:point)": "loadRot",
    "*default": "loadBasic"
  },
  loadZoom: function loadZoom(line, point) {
    console.log("load zoom");
  },
  loadRot: function loadRot(line, point) {
    console.log("load rot");
  },
  loadBasic: function loadBasic() {
    this.showMenu();
  },
  showMenu: function loadMenu() {
    this.menu.showMenu();
  }
}))();
