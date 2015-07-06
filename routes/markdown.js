var fs = require('fs');
var join = require('path').join;
var url = require("url");
var marked = require('marked');
var hljs = require('highlight.js');
marked.setOptions({
  renderer: new marked.Renderer()
  , gfm: true
  , tables: true
  , breaks: true
  , pedantic: true
  , sanitize: false
  , smartLists: true
  // ,smartypants: true
});
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

module.exports = function (app) {
  function markdown(path, options, fn) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) return fn(err);
      var html = app.get('header') + marked(data) + app.get('footer');
      fn(null, html);
    });
  };

  app.engine('md', markdown);
  app.engine('markdown', markdown);

  app.get('*.md', function (req, res, next) {
    var pathname = decodeURI(url.parse(req.url, true).pathname);
    console.log(pathname);
    res.render(pathname.substring(1));
  });

  app.get('*.markdown', function (req, res, next) {
    var pathname = decodeURI(url.parse(req.url, true).pathname);
    console.log(pathname);
    res.render(pathname.substring(1));
  });


};
