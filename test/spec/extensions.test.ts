import assert from 'assert';
// @ts-ignore
import importDirectory from 'esm-import-directory';
import size from 'lodash.size';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('extensions', () => {
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

  it('extensions: (default), recursive: false, paths: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false, paths: true });
    assert.equal(size(results), isModule ? 1 : 2);
  });

  it('extensions: (default), recursive: true, paths: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true, paths: true });
    assert.equal(size(results), isModule ? 5 : 10);
  });

  it('extensions: (default), recursive: false, paths: true, default: false', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it('extensions: (default), recursive: false, paths: true, default: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: false, paths: true });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: true, paths: true });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs', '.js'], recursive: true, paths: true, default: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false, paths: true });
    assert.equal(size(results), isModule ? 1 : 2);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: true, paths: true });
    assert.equal(size(results), isModule ? 5 : 10);
  });

  it("extensions: ['.mjs'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });
});
