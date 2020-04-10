var path = require('path');
var chai = require('chai');
var size = require('lodash.size');

var requireDirectory = require('../..');

var assert = chai.assert;
var DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('filename', function () {
  describe('paths: true', function () {
    it('filename: (default), recursive: true', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          paths: true,
          recursive: true,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(!Array.isArray(results));
          assert.equal(size(results), 10);
          for (var relativePath in results) {
            assert.equal(path.extname(relativePath), '');
          }
          done();
        }
      );
    });

    it('filename: true, recursive: true', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          filename: true,
          paths: true,
          recursive: true,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(!Array.isArray(results));
          assert.equal(size(results), 10);
          for (var relativePath in results) {
            assert.equal(path.extname(relativePath), '');
          }
          done();
        }
      );
    });

    it('filename: false, recursive: true', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          filename: false,
          paths: true,
          recursive: true,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(!Array.isArray(results));
          assert.equal(size(results), 10);
          for (var relativePath in results) {
            assert.equal(path.extname(relativePath), '.js');
          }
          done();
        }
      );
    });
  });

  describe('paths: false', function () {
    it('filename: (default), recursive: true', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          paths: false,
          recursive: true,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(Array.isArray(results));
          assert.equal(size(results), 10);
          done();
        }
      );
    });

    it('filename: true, recursive: false', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          filename: true,
          paths: false,
          recursive: false,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(!Array.isArray(results));
          assert.equal(size(results), 2);
          for (var relativePath in results) {
            var module = results[relativePath];
            assert.ok(!Array.isArray(module));
            assert.equal(path.extname(relativePath), '');
          }
          done();
        }
      );
    });

    it('filename: true, recursive: true', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          filename: true,
          paths: false,
          recursive: true,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(!Array.isArray(results));
          assert.equal(size(results), 2);
          for (var relativePath in results) {
            var module = results[relativePath];
            assert.equal(module.length, 5);
            assert.equal(path.extname(relativePath), '');
          }
          done();
        }
      );
    });

    it('filename: false, recursive: true', function (done) {
      requireDirectory(
        DATA_DIRECTORY,
        {
          filename: false,
          paths: false,
          recursive: true,
        },
        function (err, results) {
          assert.ok(!err);
          assert.ok(Array.isArray(results));
          assert.equal(size(results), 10);
          done();
        }
      );
    });
  });
});
