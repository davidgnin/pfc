var PfcApp = Backbone.Router.extend({
  start: function startPfcApp() {
    this.menu = new MenuView();
    this.bar = new BarView();
    Backbone.history.start();
  },
  routes: {
    "zoom/:line/:point": "loadZoom",
    "rot/:line/:point": "loadRot",
    "*default": "loadBasic"
  },
  loadZoom: function loadZoom(line, point) {
    this.loadBasic();
    console.log("load zoom");
  },
  loadRot: function loadRot(line, point) {
    this.loadBasic();
    console.log("load rot");
  },
  loadBasic: function loadBasic() {
    console.log("load basic");
  }
});
