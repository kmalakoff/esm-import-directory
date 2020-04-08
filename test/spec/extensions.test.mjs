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
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true });
    assert.equal(size(results), 3);
  });

  it("extensions: ['.mjs', '.js'], recursive: true, paths: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true });
    assert.equal(size(results), 15);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, paths: true, default: false });
    assert.equal(size(results), 4);
  });

  it("extensions: ['.mjs', '.js'], recursive: false, paths: true, default: true", async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, paths: true, default: false });
    assert.equal(size(results), 20);
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
