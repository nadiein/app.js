$(function () {
  'use strict';
  function TagList(node, tags) {
    this.node = node;
    this.tags = tags || [];
    this.TagList = this.buildTagList();
    this.nodeInput = $('.input-field', this.node);
    this.switchModeBtn = $('.switch-btn', this.node);
    this.inputField = $('.input-field', this.node);
    this.addMoreTags = $('.add-more', this.node);
    this.deleteAllTags = $('.delete-tags', this.node);
    this.tagsCont = $('.tags-cont', this.node);
    this.init();
  }
  TagList.prototype.buildTagList = function () {
      var container = $('<div class="wrapper"><div class="control-btns"><div class="switch-btn btn active">View mode</div><input class="input-field unactive" type="text" placeholder="Enter the name of the tag"/><div class="add-more unactive">Add more tags</div><div class="delete-tags unactive">Delete tags tags</div></div><div class="tags-cont"></div></div>');
      container.appendTo(this.node);
  };
  TagList.prototype.addTag = function () {
    var that = this;
    this.tags.forEach(function (element, index) {
      if (element != '') {
        var tag = $('<div class="tag"></div>');
        var closeTag = $('<i class="fa fa-times" aria-hidden="true"></i>');
        tag.text('#' + element);
        closeTag.appendTo(tag);
        tag.appendTo(that.tagsCont);
      }
    });
    this.addMoreTags.on('click', function () {
      if (that.inputField.val() != '') {
        var tag = $('<div class="tag"><i class="fa fa-times" aria-hidden="true"></i></div>');
        var closeTag = $('<i class="fa fa-times" aria-hidden="true"></i>');
        tag.text('#' + that.inputField.val());
        closeTag.appendTo(tag);
        tag.appendTo(that.tagsCont);
        that.inputField.val('');
        that.tags.push(tag.text());
      }
    });
    $(document).on('keyup', function(event) {
			if (event.keyCode === 13) {
				if (that.inputField.val() != '') {
          var tag = $('<div class="tag"><i class="fa fa-times" aria-hidden="true"></i></div>');
          var closeTag = $('<i class="fa fa-times" aria-hidden="true"></i>');
          tag.text('#' + that.inputField.val());
          closeTag.appendTo(tag);
          tag.appendTo(that.tagsCont);
          that.inputField.val('');
          that.tags.push(tag.text());
        }
			}
		});
  };
  TagList.prototype.switchMode = function () {
    var that = this;
    this.switchModeBtn.on('click', function () {
      $(this).text(function (i, text) {
        return text === 'Edit mode' ? 'View mode' : 'Edit mode';
      });
      that.inputField.toggleClass('unactive');
      that.addMoreTags.toggleClass('unactive');
      that.deleteAllTags.toggleClass('unactive');
    });
  };
  TagList.prototype.removeTags = function () {
    var that = this;
    this.deleteAllTags.on('click', function () {
        that.tagsCont.children().remove();
        that.tags = [];
    });
  };
  TagList.prototype.closeTag = function () {
    var that = this;
    Array.prototype.removeFromArray = function(from, to) {
       var rest = this.slice((to || from) + 1 || this.length);
       this.length = from < 0 ? this.length + from : from;
       return this.push.apply(this, rest);
    };
    this.tagsCont.on('click', '.tag', function() {
        $(this).each(function (i, el) {
          el.lastChild.parentNode.remove();
          that.tags.removeFromArray(i);
        });
    });
  };
  TagList.prototype.init = function () {
    this.switchMode();
    this.addTag();
    this.removeTags();
    this.closeTag();
  };
  
  new TagList($('.main1'), ['boo', 'moo', 'foo']);
  new TagList($('.main2'), ['boo', 'moo', 'foo']);
  new TagList($('.main3'), ['boo', 'moo', 'foo']);
});
