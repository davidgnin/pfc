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
    this.newTag = new NewTagView();
    this.newTag.start();
    this.addTag = new AddTagView();
    this.addTag.start();
    this.bar = new BarView();
    this.bar.start();
    this.loadingLayer = new LoadingLayerView();
    this.tagControl = new TagControlView();
    this.tagControl.start();
    this.tag = new TagView();
    this.tag.start();

    this.tags = new TagsCollection();
    this.markers = new MarkersCollection();
    var that = this;
    $(window).on("resize", function () {
      that.fixMarkers(that);
    });

    this.tags.add(TAGS);
    this.markers.add(MARKERS);

    Backbone.history.start();
  },
  routes: {
    "zoom/:line(/:point)": "loadZoom",
    "rot/:line(/:point)": "loadRot",
    "*default": "loadBasic"
  },
  loadZoom: function loadZoom(line, point) {
    var that = this;
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
      that = this;
      var interval = setInterval(function () {
        that.loadingLayer.update(myPreloader.percentage());
        if (myPreloader.preloaded()) {
          clearInterval(interval);
          if (that.lineView) {
            that.lineView.unbind();
          }
          that.lineView = new ZoomView();
          var allData = that.lineView.start(line, lineData, point);
          var barData = allData[that.point];
          $("#wrapper").removeClass("rot-mode").addClass("zoom-mode");
          that.bar.updateBar((that.point/(that.photos - 1))*100);
          that.bar.updateInfo(barData);
          that.tagLayer = new TagLayerZoom();
          that.tagLayer.start(allData);
          that.tagLayer.showMarkers(barData.scale);
          that.loadingLayer.hide();
        }
      }, 50);
    } else if ((point || point === 0) && (point != this.point)) {
      if (!this.blockEvents) {
        this.blockEvents = true;
        this.tagLayer.hideMarkers();
        this.point = point;
        var barData = this.lineView.changePoint(point);
        that = this;
        setTimeout(function () {
          that.tagLayer.showMarkers(barData.scale);
        }, 250);
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
          that.tagLayer = new TagLayerRot();
          that.tagLayer.start();
          that.tagLayer.showMarkers(that.point);
          that.loadingLayer.hide();
        }
      }, 50);
    } else if ((point || point === 0) && (point != this.point)) {
      if (!this.blockEvents) {
        this.blockEvents = true;
        this.point = point;
        this.lineView.changePoint(point);
        this.tagLayer.showMarkers(this.point);
        this.bar.updateBar((point/(this.photos - 1))*100);
      }
    }
  },
  loadBasic: function loadBasic() {
    this.showMenu();
  },
  showMenu: function loadMenu() {
    this.menu.show();
  },
  showNewTag: function loadNewTag(tag) {
    this.newTag.show(tag);
  },
  showAddTag: function loadAddTag(tag) {
    var marker;
    if (tag) {
      marker = this.markers.findWhere({
        tagId: tag.id
      });
    }
    this.addTag.show(marker, (this.section == "rot" && this.tagLayer.ampli == 3));
  },
  backNewTag: function backNewTag() {
    this.newTag.backTo();
  },
  norm: function norm(x, y, toIdeal) {
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    if (width >= 800 && height >= 600) {
      return { x: x, y: y };
    } else {
      var mult;
      var plus = {
        x: 0,
        y: 0
      };
      var ratio = height*800/width;
      if (ratio > 600) { /*height rules*/
        if (toIdeal) {
          mult = 600/height;
          plus.x = (800 - width*mult)/2;
        } else {
          mult = height/600;
          plus.x = -1*(800*mult - width)/2;
        }
      } else { /*width rules*/
        if (toIdeal) {
          mult = 800/width;
          plus.y = (600 - ratio)/2;
        } else {
          mult = width/800;
          plus.y = -1*(600*mult - height)/2;
        }
      }
      return { x: x*mult + plus.x, y: y*mult + plus.y };
    }
  },
  saveTag: function saveTag(pmd, marker) {
    var tagData = this.newTag.getData();
    tagData.section = this.section;
    tagData.line = this.line;
    var tag, md;
    if (this.section == "rot" && this.tagLayer.ampli == 3) {
      var top = -1*parseFloat($("#canvas .aux-layer").css("top").replace("px", ""), 10);
      var left = -1*parseFloat($("#canvas .aux-layer").css("left").replace("px", ""), 10);
      pmd.top = (pmd.top + top)/3;
      pmd.left = (pmd.left + left)/3;
    }
    md = this.norm(pmd.left, pmd.top, true);
    if (marker) {
      tag = this.tags.get(marker.get("tagId"));
      tag.set(tagData);
      this.tags.add(tag);
      marker.set(md);
      this.markers.add(marker);
    } else {
      tag = new TagModel(tagData);
      tag.set("id", tag.cid);
      this.tags.push(tag);
      md.tagId = tag.cid;
      md.point = this.point;
      this.markers.add(md);
    }
    this.newTag.hide();
    if (this.section == "zoom") {
      this.tagLayer.showMarkers();
    } else {
      this.tagLayer.showMarkers(this.point);
    }
  },
  fixMarkers: function fixMarkers(that) {
    that.tagLayer.fastReShow();
  },
  switchRotTags: function switchRotTags(ampli) {
    this.tagLayer.switchTags(ampli);
  },
  showTag: function showTag(tagId) {
    var tag = this.tags.findWhere({
      id: tagId
    });
    this.tag.show(tag);
  },
  deleteTag: function deleteTag(tag) {
    var markers = this.markers.where({
      tagId: tag.get("id")
    });
    this.markers.remove(markers);
    this.tags.remove(tag);
    if (this.section == "zoom") {
      this.tagLayer.showMarkers();
    } else {
      this.tagLayer.showMarkers(this.point);
    }
  },
  getTagName: function getTagName(tagId) {
    var tag = this.tags.get(tagId);
    return tag.get("name");
  },
  getActiveTags: function getActiveTags() {
    var tags = this.tags.where({
      section: this.section,
      line: this.line
    });
    var tagIds = [];
    for (var i = 0, length = tags.length; i < length; i++) {
      tagIds.push(tags[i].id);
    }
    return tagIds;
  }
}))();
