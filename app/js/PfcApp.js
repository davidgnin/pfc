var PfcApp = new (Backbone.Router.extend({
  section: "zoom",
  line: null,
  start: function startPfcApp() {
    this.menu = new MenuView();
    this.menu.start();
    this.bar = new BarView();
    this.loadingLayer = new LoadingLayerView();
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
    if (!(this.section == "rot" && this.line == line)) {
      this.section = "rot";
      this.line = line;
      var lineData = LINES.rot[line];
      var preloadData = [];
      for (var i = 0; i < lineData.photos; i++) {
        preloadData.push({ url: "img/rot/" + line + "/" + i + ".jpg",
          weight: 1 });
      }
      var myPreloader = ImgPreloader(preloadData);
      this.loadingLayer.show();
      myPreloader.start();
      var that = this;
      var interval = setInterval(function () {
        that.loadingLayer.update(myPreloader.percentage());
        if (myPreloader.preloaded()) {
          clearInterval(interval);
          this.lineView = new RotView();
          this.lineView.start(line, lineData, point);
          that.loadingLayer.hide();
        }
      }, 50);
    }
  },
  loadBasic: function loadBasic() {
    this.showMenu();
  },
  showMenu: function loadMenu() {
    this.menu.showMenu();
  }
}))();
