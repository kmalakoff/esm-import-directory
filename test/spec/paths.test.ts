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

describe('paths', () => {
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

  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: false,
      paths: true,
    });
    assert.equal(size(results), isModule ? 1 : 2);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: true,
      paths: true,
    });
    assert.equal(size(results), isModule ? 5 : 10);
  });

  it("extensions: ['.mjs'], recursive: false, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: false,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs'], recursive: true, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: true,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 10);
  });
});
