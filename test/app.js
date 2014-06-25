
var support = require('./support');
var request = require('co-request');
var join = require('path').join;
var App = require('../lib/app');
var assert = require('assert');
var fs = require('co-fs');

describe('App', function(){
  it('should listen and serve', function*(){
    var path = support.fixture('simple-success');
    var app = App(path);
    yield app.listen();
    var a = yield request(app.url());
    var b = yield fs.readFile(join(path, 'test', 'index.html'), 'utf8');
    assert(a.body && b);
    assert.equal(a.body, b);
    app.destroy();
  })

  it('should enable localtunnel when `opts.tunnel = true`', function*(){
    var path = support.fixture('simple-success');
    var app = App(path, { tunnel: true });
    yield app.listen();
    var a = yield request(app.url());
    var b = yield fs.readFile(join(path, 'test', 'index.html'), 'utf8');
    assert(a.body && b);
    assert.equal(a.body, b);
    app.destroy();
  })
})
