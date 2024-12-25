import assert from 'assert';
import path from 'path';
import url from 'url';

import importDirectory from 'esm-import-directory';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('callback', function () {
  it('default: true, recursive: false', function (done) {
    importDirectory(DATA_DIR, { default: true, recursive: false }, function (err, results) {
      assert.ok(!err, err ? err.message : '');
      assert.equal(results.length, 1);
      done();
    });
  });

  it('default: true, recursive: true', function (done) {
    importDirectory(DATA_DIR, { default: true, recursive: true }, function (err, results) {
      assert.ok(!err, err ? err.message : '');
      assert.equal(results.length, 5);
      done();
    });
  });

  it('default: false, recursive: false', function (done) {
    importDirectory(DATA_DIR, { default: false, recursive: false }, function (err, results) {
      assert.ok(!err, err ? err.message : '');
      assert.equal(results.length, 2);
      done();
    });
  });

  it('default: false, recursive: true', function (done) {
    importDirectory(DATA_DIR, { default: false, recursive: true }, function (err, results) {
      assert.ok(!err, err ? err.message : '');
      assert.equal(results.length, 10);
      done();
    });
  });
});
