import assert from 'assert';
// @ts-ignore
import importDirectory from 'esm-import-directory';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('defaultOptions', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();

  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });
});
