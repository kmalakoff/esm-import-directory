import assert from 'assert';
import path from 'path';
import url from 'url';
import size from 'lodash.size';

import importDirectory from 'esm-import-directory';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('extensions', () => {
  it('extensions: (default), recursive: false, paths: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: false, paths: true });
    assert.equal(size(results), 1);
  });

  it('extensions: (default), recursive: true, paths: true', async () => {
    const results = await importDirectory(DATA_DIR, { recursive: true, paths: true });
    assert.equal(size(results), 5);
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
    assert.equal(size(results), 1);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIR, { extensions: ['.mjs'], recursive: true, paths: true });
    assert.equal(size(results), 5);
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
