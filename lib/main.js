var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
const data = require("sdk/self").data;

var worker;

var helpPanel = require("sdk/panel").Panel({
  width: 200,
  height: 100,
  contentURL: data.url("html/help.html")
});

var widget = widgets.Widget({
  id: "avro-trigger",
  label: "Avro Phonetic",
  contentURL: data.url("img/icon-16-dim.png"),
  panel: helpPanel
});

tabs.on('ready', function(tab) {
  worker = tab.attach({
    contentScriptFile: [
      data.url("js/jquery-1.10.2.js"),
      data.url("js/avro-lib-v1.1.4.js"),
      data.url("js/avro.jquery-v1.1.4.js"),
      data.url("js/content.js")
    ],
    onMessage: function (message) {
      if (message == 'true') {
        widget.contentURL = data.url("img/icon-16.png");
      }
      else {
        widget.contentURL = data.url("img/icon-16-dim.png");
      }
    }
  });
});