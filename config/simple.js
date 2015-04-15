'use strict';

var fs   = require('fs'),
    path = require('path'),
    html = fs.readFileSync(path.resolve(__dirname, '../app/simple.html'), 'utf-8');

module.exports = function(path, scriptUrl, styleUrl, commonsUrl, callback) {
  callback(null, html.replace('SCRIPT_URL', scriptUrl));
};
