import path from 'path';
import chai from 'chai';

import importDirectory from '../../index.mjs';

const assert = chai.assert;
const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('callback', function () {
  it('default: true, recursive: false', function (done) {
    importDirectory(DATA_DIRECTORY, { default: true, recursive: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 1);
      done();
    });
  });

  it('default: true, recursive: true', function (done) {
    importDirectory(DATA_DIRECTORY, { default: true, recursive: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 5);
      done();
    });
  });

  it('default: false, recursive: false', function (done) {
    importDirectory(DATA_DIRECTORY, { default: false, recursive: false }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 2);
      done();
    });
  });

  it('default: false, recursive: true', function (done) {
    importDirectory(DATA_DIRECTORY, { default: false, recursive: true }, function (err, results) {
      assert.ok(!err);
      assert.equal(results.length, 10);
      done();
    });
  });
});
