import assert from 'assert';
import importDirectory from 'esm-import-directory';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('callback', () => {
  it('default: true, recursive: false', (done) => {
    importDirectory(DATA_DIR, { default: true, recursive: false }, (err, results) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal((results as unknown[]).length, isModule ? 1 : 2);
      done();
    });
  });

  it('default: true, recursive: true', (done) => {
    importDirectory(DATA_DIR, { default: true, recursive: true }, (err, results) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal((results as unknown[]).length, isModule ? 5 : 10);
      done();
    });
  });

  it('default: false, recursive: false', (done) => {
    importDirectory(DATA_DIR, { default: false, recursive: false }, (err, results) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal((results as unknown[]).length, 2);
      done();
    });
  });

  it('default: false, recursive: true', (done) => {
    importDirectory(DATA_DIR, { default: false, recursive: true }, (err, results) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal((results as unknown[]).length, 10);
      done();
    });
  });
});
