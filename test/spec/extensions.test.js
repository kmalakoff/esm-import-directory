var path = require('path');
var chai = require('chai');
var size = require('lodash.size');

var requireDirectory = require('../..');

var assert = chai.assert;
var DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('extensions', function () {
  it('extensions: (default), recursive: false, paths: true', function (done) {
    requireDirectory(DATA_DIR, { recursive: false, paths: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 2);
      done();
    });
  });

  it('extensions: (default), recursive: true, paths: true', function (done) {
    requireDirectory(DATA_DIR, { recursive: true, paths: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 10);
      done();
    });
  });

  it('extensions: (default), recursive: false, paths: true, default: false', function (done) {
    requireDirectory(DATA_DIR, { recursive: false, paths: true, default: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 2);
      done();
    });
  });

  it('extensions: (default), recursive: false, paths: true, default: true', function (done) {
    requireDirectory(DATA_DIR, { recursive: true, paths: true, default: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 10);
      done();
    });
  });

  it("extensions: ['.js'], recursive: false, paths: true", function (done) {
    requireDirectory(DATA_DIR, { extensions: ['.js'], recursive: false, paths: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 2);
      done();
    });
  });

  it("extensions: ['.js'], recursive: true, paths: true", function (done) {
    requireDirectory(DATA_DIR, { extensions: ['.js'], recursive: true, paths: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 10);
      done();
    });
  });

  it("extensions: ['.js'], recursive: false, paths: true, default: false", function (done) {
    requireDirectory(DATA_DIR, { extensions: ['.js'], recursive: false, paths: true, default: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 2);
      done();
    });
  });

  it("extensions: ['.js'], recursive: false, paths: true, default: true", function (done) {
    requireDirectory(DATA_DIR, { extensions: ['.js'], recursive: true, paths: true, default: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(size(results), 10);
      done();
    });
  });
});
