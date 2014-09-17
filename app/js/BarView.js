BarView = Backbone.View.extend({
  el: "#bar",
  mwLoading: false,
  mwDelta: 0,
  start: function start() {
    var that = this;
    this.$(".menu-button").on(PfcApp.event, this.showMenu);
    this.$(".marker-button").on(PfcApp.event, this.showNewTag);
    this.$(".plus-button").on(PfcApp.event, this.goPlus);
    this.$(".minus-button").on(PfcApp.event, this.goMinus);
    this.$(".bar-zone").on(PfcApp.event, function (e) {
      that.barJump(e, that);
    });
    this.mouseWheel();
  },
  mouseWheel: function () {
    var that = this;
    $("#canvas").on("mousewheel.pfcapp", function (e) {
      if (!PfcApp.blockEvents) {
        e.preventDefault();
        if (e.deltaY > 0) {
          if (that.mwDelta > -4) {
            that.mwDelta--;
          }
        } else if (that.mwDelta < 4) {
          that.mwDelta++;
        }
        if (!that.mwLoading) {
          that.mwLoading = true;
          setTimeout(function () {
            
            var point = parseInt(PfcApp.point, 10);
            var photos = parseInt(PfcApp.photos, 10);
            var zoomMode = $("#wrapper").hasClass("zoom-mode");
            var newPoint = point + that.mwDelta;
            if (!zoomMode) newPoint = (newPoint%photos + photos)%photos;
            else if (newPoint < 0) newPoint = 0;
            else if (newPoint >= photos) newPoint = photos - 1;
            PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint,
              { trigger: true });

            setTimeout(function () {
              that.mwDelta = 0;
              that.mwLoading = false;
            }, 205);
          }, 80);
        }
      }
    });
  },
  showMenu: function showMenu(e) {
    e.preventDefault();
    if (!PfcApp.blockEvents) {
      PfcApp.showMenu();
    }
  },
  showNewTag: function showNewTag(e) {
    e.preventDefault();
    if (!PfcApp.blockEvents) {
      PfcApp.showNewTag();
    }
  },
  goPlus: function goPlus(e) {
    e.preventDefault();
    if (!PfcApp.blockEvents) {
      var point = parseInt(PfcApp.point, 10);
      var photos = parseInt(PfcApp.photos, 10);
      var zoomMode = $("#wrapper").hasClass("zoom-mode");
      var newPoint = point + 1;
      if (newPoint == photos && !zoomMode) {
        newPoint = 0;
        PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint,
          { trigger: true });
      } else if (newPoint < photos) {
        PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint,
          { trigger: true });
      }
    }
  },
  goMinus: function goMinus(e) {
    e.preventDefault();
    if (!PfcApp.blockEvents) {
      var point = parseInt(PfcApp.point, 10);
      var photos = parseInt(PfcApp.photos, 10);
      var zoomMode = $("#wrapper").hasClass("zoom-mode");
      var newPoint = point - 1;
      if (newPoint < 0 && !zoomMode) {
        newPoint = photos - 1;
        PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint,
          { trigger: true });
      } else if (newPoint >= 0) {
        PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint,
          { trigger: true });
      }
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
  },
  barJump: function barJump(e, that) {
    e.preventDefault();
    if (!PfcApp.blockEvents) {
      var width = that.$(".bar-zone").width();
      var offset;
      if (PfcApp.event == "touchstart") {
        offset = e.originalEvent.touches[0].pageX - that.$(".bar-zone").offset().left;
      } else {
        offset = e.pageX - that.$(".bar-zone").offset().left;
      }
      var newPoint = Math.floor((offset*PfcApp.photos)/width);
      PfcApp.navigate(PfcApp.section + "/" + PfcApp.line + "/" + newPoint,
        { trigger: true });
    }
  }
});
