var path = require('path');
var chai = require('chai');

var requireDirectory = require('../..');

var assert = chai.assert;
var DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('default', function () {
  it('default: true, recursive: false', function (done) {
    requireDirectory(DATA_DIRECTORY, { default: true, recursive: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 2);
      done();
    });
  });

  it('default: true, recursive: true', function (done) {
    requireDirectory(DATA_DIRECTORY, { default: true, recursive: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 10);
      done();
    });
  });

  it('default: false, recursive: false', function (done) {
    requireDirectory(DATA_DIRECTORY, { default: false, recursive: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 2);
      done();
    });
  });

  it('default: false, recursive: true', function (done) {
    requireDirectory(DATA_DIRECTORY, { default: false, recursive: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 10);
      done();
    });
  });
});
