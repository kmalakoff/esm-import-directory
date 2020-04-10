import path from 'path';
import chai from 'chai';
import size from 'lodash.size';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('extensions', () => {
  it('extensions: (default), recursive: false, paths: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false, paths: true });
    assert.equal(size(results), 1);
  });

  it('extensions: (default), recursive: true, paths: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true, paths: true });
    assert.equal(size(results), 5);
  });

  it('extensions: (default), recursive: false, paths: true, default: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it('extensions: (default), recursive: false, paths: true, default: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    try {
      await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    try {
      await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    try {
      await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    try {
      await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true, default: false });
      assert.ok(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: false, paths: true });
    assert.equal(size(results), 1);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: true, paths: true });
    assert.equal(size(results), 5);
  });

  it("extensions: ['.mjs'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });
});
