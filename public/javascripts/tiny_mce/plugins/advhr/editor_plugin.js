(function () {
  tinymce.create("tinymce.plugins.AdvancedHRPlugin", {
    init: function (a, b) {
      a.addCommand("mceAdvancedHr", function () {
        a.windowManager.open(
          {
            file: b + "/rule.htm",
            width: 250 + parseInt(a.getLang("advhr.delta_width", 0)),
            height: 160 + parseInt(a.getLang("advhr.delta_height", 0)),
            inline: 1,
          },
          { plugin_url: b }
        );
      });
      a.addButton("advhr", { title: "advhr.advhr_desc", cmd: "mceAdvancedHr" });
      a.onNodeChange.add(function (d, c, e) {
        c.setActive("advhr", e.nodeName == "HR");
      });
      a.onClick.add(function (c, d) {
        d = d.target;
        if (d.nodeName === "HR") {
          c.selection.select(d);
        }
      });
    },
    getInfo: function () {
      return {
        longname: "Advanced HR",
        author: "Moxiecode Systems AB",
        authorurl: "http://tinymce.moxiecode.com",
        infourl: "http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advhr",
        version: tinymce.majorVersion + "." + tinymce.minorVersion,
      };
    },
  });
  tinymce.PluginManager.add("advhr", tinymce.plugins.AdvancedHRPlugin);
})();
