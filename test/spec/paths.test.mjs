import path from 'path';
import chai from 'chai';
import size from 'lodash.size';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('paths', () => {
  it("extensions: ['.mjs'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs'],
      recursive: false,
      paths: true,
    });
    assert.equal(size(results), 1);
  });

  it("extensions: ['.mjs'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs'],
      recursive: true,
      paths: true,
    });
    assert.equal(size(results), 5);
  });

  it("extensions: ['.mjs'], recursive: false, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs'],
      recursive: false,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 2);
  });

  it("extensions: ['.mjs'], recursive: true, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs'],
      recursive: true,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 10);
  });
});
