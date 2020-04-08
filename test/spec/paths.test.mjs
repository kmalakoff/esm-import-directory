import path from 'path';
import chai from 'chai';
import size from 'lodash.size';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('paths', () => {
  it("extensions: ['.mjs', '.js'], recursive: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: false,
      paths: true,
    });
    assert.equal(size(results), 3);
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: true,
      paths: true,
    });
    assert.equal(size(results), 15);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: false,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 4);
  });

  it("extensions: ['.mjs', '.js'], recursive: true, default: false, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, {
      extensions: ['.mjs', '.js'],
      recursive: true,
      default: false,
      paths: true,
    });
    assert.equal(size(results), 20);
  });
});
