var path = require('path');
var assert = require('assert');

var requireDirectory = require('esm-import-directory');

var DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('defaultOptions', function () {
  it('recursive: false', function (done) {
    requireDirectory(DATA_DIR, { recursive: false }, function (err, results) {
      assert.ok(!err, err ? err.message : '');
      assert.equal(results.length, 2);
      done();
    });
  });

  it('recursive: true', function (done) {
    requireDirectory(DATA_DIR, { recursive: true }, function (err, results) {
      assert.ok(!err, err ? err.message : '');
      assert.equal(results.length, 10);
      done();
    });
  });
});
