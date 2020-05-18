var path = require('path');
var chai = require('chai');

var requireDirectory = require('../..');

var assert = chai.assert;

describe('errors', function () {
  it('fail to import an errored module (cjs)', function (done) {
    var DATA_DIR = path.join(__dirname, '..', 'data', 'errors');

    // errors on problematic cjs
    requireDirectory(DATA_DIR, { extensions: ['.js'], recursive: false }, function (err, results) {
      assert.ok(!!err);
      done();
    });
  });

  it('fail to import an errored module (mjs)', function (done) {
    var DATA_DIR = path.join(__dirname, '..', 'data', 'errors');

    // skips on problematic esm
    try {
      requireDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false }, function (err, results) {
        assert.ok(!err);
        done();
      });
    } catch (err) {
      assert.ok(err);
      done();
    }
  });
});
