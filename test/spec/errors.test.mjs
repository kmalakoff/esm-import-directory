import path from 'path';
import url from 'url';
import chai from 'chai';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

describe('errors', () => {
  it('fail to import an errored module (mjs)', async () => {
    const DATA_DIR = path.join(__dirname, '..', 'data', 'errors');
    let err;

    try {
      await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: false });
    } catch (_err) {
      err = _err;
    }

    assert.ok(!!err);
  });

  it('fail to import an errored module (cjs)', async () => {
    const DATA_DIR = path.join(__dirname, '..', 'data', 'errors');
    let err;

    try {
      await importDirectory(DATA_DIR, { extensions: ['.js'], recursive: false });
    } catch (_err) {
      err = _err;
    }

    assert.ok(!!err);
  });
});
