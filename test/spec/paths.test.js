var path = require('path');
var assert = require('assert');
var size = require('lodash.size');

var requireDirectory = require('esm-import-directory');

var DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('paths', function () {
  it("extensions: ['.js'], recursive: false, paths: true", function (done) {
    requireDirectory(
      DATA_DIR,
      {
        extensions: ['.js'],
        recursive: false,
        paths: true,
      },
      function (err, results) {
        assert.ok(!err);
        assert.equal(size(results), 2);
        done();
      }
    );
  });

  it("extensions: ['.js'], recursive: true, paths: true", function (done) {
    requireDirectory(
      DATA_DIR,
      {
        extensions: ['.js'],
        recursive: true,
        paths: true,
      },
      function (err, results) {
        assert.ok(!err);
        assert.equal(size(results), 10);
        done();
      }
    );
  });

  it("extensions: ['.js'], recursive: false, default: false, paths: true", function (done) {
    requireDirectory(
      DATA_DIR,
      {
        extensions: ['.js'],
        recursive: false,
        default: false,
        paths: true,
      },
      function (err, results) {
        assert.ok(!err);
        assert.equal(size(results), 2);
        done();
      }
    );
  });

  it("extensions: ['.js'], recursive: true, default: false, paths: true", function (done) {
    requireDirectory(
      DATA_DIR,
      {
        extensions: ['.js'],
        recursive: true,
        default: false,
        paths: true,
      },
      function (err, results) {
        assert.ok(!err);
        assert.equal(size(results), 10);
        done();
      }
    );
  });
});
