import assert from 'assert';
import path from 'path';
import url from 'url';
// @ts-ignore
import importDirectory from 'esm-import-directory';
import Pinkie from 'pinkie-promise';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('default', () => {
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

  it('default: true, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('default: true, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });

  it('default: false, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: false });
    assert.equal((results as unknown[]).length, 2);
  });

  it('default: false, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: true });
    assert.equal((results as unknown[]).length, 10);
  });
});
