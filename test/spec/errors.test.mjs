import path from 'path';
import chai from 'chai'; const { assert } = chai;

import importDirectory from '../..';

const dirname = path.dirname(import.meta.url.replace('file://', ''));

describe('errors', () => {
  it('fail to import an errored module (mjs)', async () => {
    const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'errors', 'cjs');
    let err;

    try { await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: false }); }
    catch (_err) { err = _err; }

    assert.ok(!!err);
  });

  it('fail to import an errored module (cjs)', async () => {
    const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'errors', 'cjs');
    let err;

    try { await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false }); }
    catch (_err) { err = _err; }

    assert.ok(!!err);
  });
});
