var NewTagView = Backbone.View.extend({
  el: "#new-tag",
  tag: null,
  start: function () {
    var that = this;
    this.$(".pfc-close-button").on(PfcApp.event, function () {
      that.hideNewTag(that);
    });
    this.$(".submit-button").on(PfcApp.event, function () {
      that.submitTag(that);
    });
  },
  hideNewTag: function hideNewTag(that) {
    that.$el.fadeOut("fast");
    PfcApp.blockEvents = false;
    that.$(".tag-name").val("").removeClass("empty");
    that.$(".tag-description").val("").removeClass("empty");
    that.tag = null;
  },
  show: function show(tag) {
    PfcApp.blockEvents = true;
    if (tag) {
      this.tag = tag;
      this.$(".tag-name").val(tag.get("name"));
      this.$(".tag-description").val(tag.get("description"));
    }
    this.$el.fadeIn("fast");
  },
  hide: function hide() {
    this.hideNewTag(this);
  },
  submitTag: function submitTag(that) {
    var validated = true;
    if (!that.$(".tag-name").val()) {
      that.$(".tag-name").addClass("empty");
      validated = false;
    }
    if (!that.$(".tag-description").val()) {
      that.$(".tag-description").addClass("empty");
      validated = false;
    }
    if (validated) {
      that.$el.fadeOut("fast");
      PfcApp.showAddTag(this.tag);
    }
  },
  backTo: function backTo() {
    this.$el.fadeIn("fast");
  },
  getData: function getData() {
    return {
      name: this.$(".tag-name").val(),
      description: this.$(".tag-description").val()
    };
  }
});
