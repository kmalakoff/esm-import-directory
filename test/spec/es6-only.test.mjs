import path from 'path';
import { assert } from 'chai';

import importDirectory from '../..';

const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'es6-only');

describe('es6-only', () => {
  describe('sync', () => {
    it('should only import top level (default)', async () => {
      const modules = await importDirectory(DATA_DIRECTORY);
      assert.equal(modules.length, 1);
    });

    it('should only import top level (recursive: false)', async () => {
      const modules = await importDirectory(DATA_DIRECTORY, { recursive: false });
      assert.equal(modules.length, 1);
    });

    it('should only import top level (recursive: true)', async () => {
      const modules = await importDirectory(DATA_DIRECTORY, { recursive: true });
      assert.equal(modules.length, 5);
    });
  });
});
