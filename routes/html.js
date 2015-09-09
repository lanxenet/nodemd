var fs = require('fs');
var join = require('path').join;
var url = require("url");

module.exports = function (app) {
  function html(path, options, fn) {
    fs.readFile(path, 'utf8', function (err, html) {
      if (err) return fn(err);
      fn(null, html);
    });
  };

  app.engine('html', html);
  app.engine('htm', html);

  app.get('*.html', function (req, res, next) {
    var pathname = decodeURI(url.parse(req.url, true).pathname);
    console.log(pathname);
    res.render(pathname.substring(1));
  });

  app.get('*.htm', function (req, res, next) {
    var pathname = decodeURI(url.parse(req.url, true).pathname);
    console.log(pathname);
    res.render(pathname.substring(1));
  });


};
