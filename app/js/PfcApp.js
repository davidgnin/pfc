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

    this.tags.add([{
      id: "t1",
      name: "Lorem Ipsum Dolor",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
      id: "t2",
      name: "Why do we use it?",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },{
      id: "t3",
      name: "Dolor sit amet",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    },{
      id: "t4",
      name: "Where dos it com",
      description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },{
      id: "t5",
      name: "Unchanged",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32."
    },{
      id: "t6",
      name: "Diplodocus test",
      description: "Cras consequat molestie risus, sed porttitor ex maximus non. Nulla facilisi. Aenean ac ante eget quam fringilla dapibus. Sed non posuere justo. Aliquam nec congue enim. Morbi urna orci, varius ut nunc vitae, volutpat fermentum ligula. Praesent aliquet ante non lectus pulvinar mattis."
    },{
      id: "t7",
      name: "Cras sit amet velit odio",
      description: "Maecenas maximus elit quis lorem tincidunt, ut porttitor dolor hendrerit. Nunc tristique urna eget tellus ornare vestibulum. Vestibulum vehicula quam et vehicula dictum. Duis mollis dui non sem porta, mattis scelerisque eros finibus. Nam varius, nisl nec ullamcorper ultrices, ex risus vestibulum dui, id pulvinar purus elit in leo. Morbi urna arcu, pretium quis laoreet ut, imperdiet ut lorem. Etiam efficitur bibendum lorem at tempor. Praesent neque metus, finibus sed libero sed, blandit commodo mi. Aliquam erat volutpat. Praesent eget nisi eros. Phasellus a orci vitae urna fermentum maximus sed id ligula. Suspendisse eu maximus arcu, non sollicitudin justo. Ut scelerisque urna tortor, vel consequat dolor interdum in. Aliquam tristique, ligula et pretium posuere, tellus nisl ornare nunc, nec feugiat eros enim ut tortor."
    },{
      id: "t8",
      name: "Suspendisse nec ex ex",
      description: "Nunc nec aliquam libero. Aenean id tortor eros. Aliquam volutpat turpis ligula, eget gravida erat eleifend vitae. Phasellus quis pulvinar enim. Morbi lacinia enim varius, molestie nunc in, volutpat risus. Pellentesque ut pulvinar dolor. Morbi mollis nec ex nec efficitur. Curabitur vel velit risus. Mauris quis elit augue. Cras varius et felis quis sollicitudin. Nunc congue mattis urna non feugiat. Sed vitae nisl auctor, laoreet nisi porttitor, faucibus odio."
    }]);

    this.markers.add([{
      tagId: "t1",
      point: "1",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t2",
      point: "3",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t3",
      point: "5",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t4",
      point: "7",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t5",
      point: "9",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t6",
      point: "11",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t7",
      point: "13",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    },{
      tagId: "t8",
      point: "15",
      x: Math.floor(Math.random()*800),
      y: Math.floor(Math.random()*600)
    }]);

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
          console.log(allData);
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
    console.log("before");
    console.log(this.tags);
    console.log(this.markers);
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
    console.log("after");
    console.log(this.tags);
    console.log(this.markers);
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
  }
}))();
