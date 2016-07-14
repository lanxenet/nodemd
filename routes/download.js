var fs = require('fs');
var path = require('path');
var url = require("url");
var mime = require('mime');

module.exports = function (app) {
  function download(req, res, next) {
    var pathname = decodeURI(url.parse(req.url, true).pathname);
    var file = path.join(app.get("views"), pathname);
    res.download(file);
  };

  app.get('*.*', download);
  // app.get('*.docx', download);
  // app.get('*.xls', download);
  // app.get('*.xlsx', download);
  // app.get('*.ppt', download);
  // app.get('*.pptx', download);
  // app.get('*.pdf', download);

};
