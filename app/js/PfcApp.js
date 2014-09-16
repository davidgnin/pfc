var PfcApp = new (Backbone.Router.extend({
  section: "zoom",
  line: null,
  point: 0,
  photos: 0,
  blockEvents: false,
  event: "click",
  start: function startPfcApp() {
    if ('ontouchstart' in document.documentElement) {
      this.event = "touchstart";
    }
    this.menu = new MenuView();
    this.menu.start();
    this.bar = new BarView();
    this.bar.start();
    this.loadingLayer = new LoadingLayerView();
    Backbone.history.start();
  },
  routes: {
    "zoom/:line(/:point)": "loadZoom",
    "rot/:line(/:point)": "loadRot",
    "*default": "loadBasic"
  },
  loadZoom: function loadZoom(line, point) {
    if (!(this.section == "zoom" && this.line == line)) {
      this.section = "zoom";
      this.line = line;
      if (point) {
        this.point = point;
      } else {
        this.point = 0;
      }
      var lineData = LINES.zoom[line];
      var photos = 0;
      if (lineData.glass) {
        photos += lineData.glass.scales.length;
      }
      if (lineData.micro) {
        photos += lineData.micro.scales.length;
      }
      if (lineData.electro) {
        photos += lineData.electro.scales.length;
      }
      this.photos = photos;
      var preloadData = [];
      for (var i = 0; i < photos; i++) {
        preloadData.push({ url: "img/zoom/" + line + "/" + i + ".jpg",
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
          if (that.lineView) {
            that.lineView.unbind();
          }
          that.lineView = new ZoomView();
          var barData = that.lineView.start(line, lineData, point);
          $("#wrapper").removeClass("rot-mode").addClass("zoom-mode");
          that.bar.updateBar((that.point/(that.photos - 1))*100);
          that.bar.updateInfo(barData);
          that.loadingLayer.hide();
        }
      }, 50);
    } else if ((point || point === 0) && (point != this.point)) {
      if (!this.blockEvents) {
        this.blockEvents = true;
        this.point = point;
        var barData = this.lineView.changePoint(point);
        this.bar.updateBar((point/(this.photos - 1))*100);
        this.bar.updateInfo(barData);
      }
    }
  },
  loadRot: function loadRot(line, point) {
    if (!(this.section == "rot" && this.line == line)) {
      this.section = "rot";
      this.line = line;
      if (point) {
        this.point = point;
      } else {
        this.point = 0;
      }
      var lineData = LINES.rot[line];
      this.photos = lineData.photos;
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
          if (that.lineView) {
            that.lineView.unbind();
          }
          that.lineView = new RotView();
          that.lineView.start(line, lineData, point);
          $("#wrapper").removeClass("zoom-mode").addClass("rot-mode");
          that.bar.updateBar((that.point/(that.photos - 1))*100);
          that.bar.updateInfo({
            source: lineData.source,
            type: "camera"
          });
          that.loadingLayer.hide();
        }
      }, 50);
    } else if ((point || point === 0) && (point != this.point)) {
      if (!this.blockEvents) {
        this.blockEvents = true;
        this.point = point;
        this.lineView.changePoint(point);
        this.bar.updateBar((point/(this.photos - 1))*100);
      }
    }
  },
  loadBasic: function loadBasic() {
    this.showMenu();
  },
  showMenu: function loadMenu() {
    this.menu.showMenu();
  }
}))();
