var path = require('path');
var assert = require('assert');

var requireDirectory = require('esm-import-directory');

var DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('default', function () {
  it('default: true, recursive: false', function (done) {
    requireDirectory(DATA_DIR, { default: true, recursive: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 2);
      done();
    });
  });

  it('default: true, recursive: true', function (done) {
    requireDirectory(DATA_DIR, { default: true, recursive: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 10);
      done();
    });
  });

  it('default: false, recursive: false', function (done) {
    requireDirectory(DATA_DIR, { default: false, recursive: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 2);
      done();
    });
  });

  it('default: false, recursive: true', function (done) {
    requireDirectory(DATA_DIR, { default: false, recursive: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 10);
      done();
    });
  });
});
