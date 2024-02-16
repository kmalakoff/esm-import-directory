import assert from 'assert';
import path from 'path';
import url from 'url';
import size from 'lodash.size';

import importDirectory from 'esm-import-directory';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('paths', () => {
  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: false,
      paths: true,
    });
    assert.equal(size(results), 1);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, {
      extensions: ['.mjs'],
      recursive: true,
      paths: true,
    });
    assert.equal(size(results), 5);
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
