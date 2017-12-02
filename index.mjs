import path from 'path';
import fs from 'fs';
import pify from 'pify';
import walk from 'walk-filtered';

const pStat = pify(fs.lstat);
const pWalk = pify(walk);
const EXTENSIONS = ['.mjs', '.js'];

async function importFile(directory, relativePath, options, results) {
  let module = await import(path.join(directory, relativePath));

  // es6 module so extract default by default unless asked not to
  if (path.extname(relativePath) === '.mjs') {
    if ((options.default === undefined) || options.default) { // check default
      if (module.default === undefined) return; // no default
      module = module.default;
    }
  }

  // collect result
  if (options.paths) results[relativePath] = module; // eslint-disable-line no-param-reassign
  else results.push(module); // eslint-disable-line no-param-reassign
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
        if (indexStats && !indexStats.isDirectory()) {
          await importFile(directory, relativeIndexPath, options, results);
          return false; // do not traverse directories
        }
      }
      return false; // do not traverse directories
    }

    const extension = path.extname(relativePath);
    if (~extensions.indexOf(extension)) await importFile(directory, relativePath, options, results);
    return true; // traverse
  }, { stats: true });

  return results;
};
