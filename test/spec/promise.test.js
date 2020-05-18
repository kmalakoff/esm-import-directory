var path = require('path');
var chai = require('chai');

var requireDirectory = require('../..');

var assert = chai.assert;
var DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('promise', function () {
  if (typeof Promise === 'undefined') return; // no promise support

  it('default: true, recursive: false', function (done) {
    requireDirectory(DATA_DIR, { default: true, recursive: false })
      .then(function (results) {
        assert.equal(results.length, 2);
        done();
      })
      .catch(function (err) {
        assert.ok(!err);
      });
  });

  it('default: true, recursive: true', function (done) {
    requireDirectory(DATA_DIR, { default: true, recursive: true })
      .then(function (results) {
        assert.equal(results.length, 10);
        done();
      })
      .catch(function (err) {
        assert.ok(!err);
      });
  });

  it('default: false, recursive: false', function (done) {
    requireDirectory(DATA_DIR, { default: false, recursive: false })
      .then(function (results) {
        assert.equal(results.length, 2);
        done();
      })
      .catch(function (err) {
        assert.ok(!err);
      });
  });

  it('default: false, recursive: true', function (done) {
    requireDirectory(DATA_DIR, { default: false, recursive: true })
      .then(function (results) {
        assert.equal(results.length, 10);
        done();
      })
      .catch(function (err) {
        assert.ok(!err);
      });
  });
});
