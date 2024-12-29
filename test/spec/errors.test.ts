import assert from 'assert';
import path from 'path';
import url from 'url';
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Promise from 'pinkie-promise';

// @ts-ignore
import importDirectory from 'esm-import-directory';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

describe('errors', () => {
  (() => {
    // patch and restore promise
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      global.Promise = Promise;
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
