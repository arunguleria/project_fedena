(function (a) {
  a.onAddEditor.addToTop(function (c, b) {
    b.settings.inline_styles = false;
  });
  a.create("tinymce.plugins.LegacyOutput", {
    init: function (b) {
      b.onInit.add(function () {
        var c = "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
          e = a.explode(b.settings.font_size_style_values),
          d = b.serializer;
        b.formatter.register({
          alignleft: { selector: c, attributes: { align: "left" } },
          aligncenter: { selector: c, attributes: { align: "center" } },
          alignright: { selector: c, attributes: { align: "right" } },
          alignfull: { selector: c, attributes: { align: "full" } },
          bold: { inline: "b" },
          italic: { inline: "i" },
          underline: { inline: "u" },
          strikethrough: { inline: "strike" },
          fontname: { inline: "font", attributes: { face: "%value" } },
          fontsize: {
            inline: "font",
            attributes: {
              size: function (f) {
                return a.inArray(e, f.value) + 1;
              },
            },
          },
          forecolor: { inline: "font", styles: { color: "%value" } },
          hilitecolor: {
            inline: "font",
            styles: { backgroundColor: "%value" },
          },
        });
        d._setup();
        a.each("b,i,u,strike".split(","), function (f) {
          var g = d.rules[f];
          if (!g) {
            d.addRules(f);
          }
        });
        if (!d.rules.font) {
          d.addRules("font[face|size|color|style]");
        }
        a.each(c.split(","), function (f) {
          var h = d.rules[f],
            g;
          if (h) {
            a.each(h.attribs, function (j, i) {
              if (i.name == "align") {
                g = true;
                return false;
              }
            });
            if (!g) {
              h.attribs.push({ name: "align" });
            }
          }
        });
        b.onNodeChange.add(function (g, k) {
          var j, f, h, i;
          f = g.dom.getParent(g.selection.getNode(), "font");
          if (f) {
            h = f.face;
            i = f.size;
          }
          if ((j = k.get("fontselect"))) {
            j.select(function (l) {
              return l == h;
            });
          }
          if ((j = k.get("fontsizeselect"))) {
            j.select(function (m) {
              var l = a.inArray(e, m.fontSize);
              return l + 1 == i;
            });
          }
        });
      });
    },
    getInfo: function () {
      return {
        longname: "LegacyOutput",
        author: "Moxiecode Systems AB",
        authorurl: "http://tinymce.moxiecode.com",
        infourl:
          "http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/legacyoutput",
        version: a.majorVersion + "." + a.minorVersion,
      };
    },
  });
  a.PluginManager.add("legacyoutput", a.plugins.LegacyOutput);
})(tinymce);
