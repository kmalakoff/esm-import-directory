import path from 'path';
import { assert } from 'chai';

import importDirectory from '../..';

const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('extensions', () => {
  it('extensions: [\'.mjs\', \'.js\'], recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false });
    assert.equal(results.length, 3);
  });

  it('extensions: [\'.mjs\', \'.js\'], recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true });
    assert.equal(results.length, 15);
  });

  it('extensions: [\'.mjs\', \'.js\'], recursive: false, default: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: false, default: false });
    assert.equal(results.length, 4);
  });

  it('extensions: [\'.mjs\', \'.js\'], recursive: false, default: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.mjs', '.js'], recursive: true, default: false });
    assert.equal(results.length, 20);
  });

  it('extensions: [\'.js\'], recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false });
    assert.equal(results.length, 2);
  });

  it('extensions: [\'.js\'], recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: true });
    assert.equal(results.length, 10);
  });

  it('extensions: [\'.js\'], recursive: false, default: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: false, default: false });
    assert.equal(results.length, 2);
  });

  it('extensions: [\'.js\'], recursive: false, default: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { extensions: ['.js'], recursive: true, default: false });
    assert.equal(results.length, 10);
  });
});
