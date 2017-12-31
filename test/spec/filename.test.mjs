import path from 'path';
import chai from 'chai';
import size from 'lodash.size';

import importDirectory from '../..';

const { assert } = chai;
const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('filename', () => {
  describe('paths: true', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        paths: true,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 5);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: true,
        paths: true,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 5);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: false,
        paths: true,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 5);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '.mjs');
      });
    });
  });

  describe('paths: false', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        paths: false,
        recursive: true
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), 5);
    });

    it('filename: true, recursive: false', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: true,
        paths: false,
        recursive: false
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 1);
      Object.entries(results).forEach(([name, value]) => {
        assert.ok(!Array.isArray(value));
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: true,
        paths: false,
        recursive: true
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 1);
      Object.entries(results).forEach(([name, value]) => {
        assert.equal(value.length, 5);
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIRECTORY, {
        filename: false,
        paths: false,
        recursive: true
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), 5);
    });
  });
});
