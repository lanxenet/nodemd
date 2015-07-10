var fs = require('fs');
var join = require('path').join;
var url = require("url");
var markdown = require("./markdown");
var download = require("./download");

//增加HTML的页头
var header = '<!DOCTYPE html>' +
  '<html lang="zh-CN">' +
  '<head>' +
  '<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">' +
  '<link rel="stylesheet" href="/css/github.css">' +
  '</head>' +
  '<body class="container">';

//增加HTML的页底
var footer =
  '<script src="/jquery/jquery-2.1.4.js"></script>' +
  '<script src="/bootstrap/js/bootstrap.min.js"></script>' +
  '</body></html>';

function listFile(viewPath, dir, req, res) {
  var path = join(viewPath, dir);
  var html = '<div class="container"><ul>';
  fs.readdir(path, function (err, files) {
    if (files && files.length) {
      files.forEach(function (filename) {
        html += '<li><a href=".' + join(dir, filename) + '"><h4>' + filename + '</h4></a></li>';
      });
      html += "</ul></div>";
      res.send(header + html + footer);
    } else {
      res.send('No  Found.');
    }
  });
};

module.exports = function (app) {
  app.set('header', header);
  app.set('footer', footer);

  app.get('/*', function (req, res, next) {
    var pathname = decodeURI(url.parse(req.url, true).pathname);
    var path = join(app.get("views"), pathname);
    console.log(pathname);
    fs.lstat(path, function (err, stats) {
      if (stats && stats.isFile()) {
        next();
      } else {
        listFile(app.get("views"), path, req, res);

      }
    });
  });

  markdown(app);
  download(app);
};