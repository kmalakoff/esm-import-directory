import assert from 'assert';
import path from 'path';
import url from 'url';
// @ts-ignore
import importDirectory from 'esm-import-directory';
import Pinkie from 'pinkie-promise';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

describe('errors', () => {
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

  it('fail to import an errored module (mjs)', async () => {
    const DATA_DIR = path.join(__dirname, '..', 'data', 'errors');
    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it('fail to import an errored module (cjs)', async () => {
    const DATA_DIR = path.join(__dirname, '..', 'data', 'errors');
    try {
      await importDirectory(DATA_DIR, { extensions: ['.js'], recursive: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });
});
