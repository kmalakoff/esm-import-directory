import path from 'path';
import chai from 'chai';
import size from 'lodash.size';

import importDirectory from '../..';

const { assert } = chai;
const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'aliasing');

describe('aliasing', () => {
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
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true });
    assert.equal(size(results), 2);
    for (const [relativePath, module] of Object.entries(results)) {
      const key = path.basename(relativePath);
      assert.ok(key === 'default' ? Array.isArray(module) : !Array.isArray(module));
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true });
    assert.equal(size(results), 10);
    for (const [relativePath, module] of Object.entries(results)) {
      const key = path.basename(relativePath);
      assert.ok(key === 'default' ? Array.isArray(module) : !Array.isArray(module));
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
    for (const module of Object.values(results)) {
      assert.ok(Array.isArray(module));
    }
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
    for (const module of Object.values(results)) {
      assert.ok(Array.isArray(module));
    }
  });

  it("extensions: ['.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false, paths: true });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: true, paths: true });
    assert.equal(size(results), 10);
  });

  it("extensions: ['.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 10);
  });
});
