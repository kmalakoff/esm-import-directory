import assert from 'assert';
import path from 'path';
import url from 'url';
// @ts-ignore
import importDirectory from 'esm-import-directory';
import size from 'lodash.size';
import Pinkie from 'pinkie-promise';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('filename', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      // @ts-ignore
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();
  describe('paths: true', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: false,
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), isModule ? '.mjs' : '.js');
      });
    });
  });

  describe('paths: false', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        paths: false,
        recursive: true,
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
    });

    it('filename: true, recursive: false', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: false,
        recursive: false,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 1 : 2);
      Object.entries(results).forEach(([name, value]) => {
        assert.ok(!Array.isArray(value));
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: false,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), isModule ? 1 : 2);
      Object.entries(results).forEach(([name, value]) => {
        assert.equal((value as unknown[]).length, 5);
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: false,
        paths: false,
        recursive: true,
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), isModule ? 5 : 10);
    });
  });
});
