import path from 'path';
import fs from 'fs';
import pify from 'pify';
import walk from 'walk-filtered';

const pStat = pify(fs.stat);
const pWalk = pify(walk);
const EXTENSIONS = ['.mjs', '.js'];

async function importFile(directory, relativePath, options, results) {
  let module = await import(path.join(directory, relativePath));

  // es6 module so extract default by default unless asked not to
  if (path.extname(relativePath) === '.mjs') {
    if (!Object.prototype.hasOwnProperty.call(options, 'default') || options.default) module = module.default;
  }

  // store result
  if (options.paths) { results[relativePath] = module; } else results.push(module); // eslint-disable-line no-param-reassign
}

export default async (directory, options = {}) => {
  const extensions = options.extensions || EXTENSIONS;
  const results = options.paths ? {} : [];

  await pWalk(directory, async (relativePath, stats) => {
    if (relativePath === '') return true;

    if (stats.isDirectory()) {
      if (options.recursive) return true; // traverse directories

      // check for index file one level under the directory
      for (const extension of extensions) {
        const relativeIndexPath = path.join(relativePath, `index${extension}`);

        let indexStats;
        try { indexStats = await pStat(path.join(directory, relativeIndexPath)); } catch (err) { /* no index */ }

        // found index
        if (indexStats && indexStats.isFile()) {
          await importFile(directory, relativeIndexPath, options, results);
          break;
        }
      }
      return false; // do not traverse directories
    }
    await importFile(directory, relativePath, options, results);
    return true; // traverse
  }, true);

  return results;
};
