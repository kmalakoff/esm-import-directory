import path from 'path';
import fs from 'fs';
import pify from 'pify';
import walk from 'walk-filtered';

const pWalk = pify(walk);
const EXTENSIONS = ['.mjs', '.js'];

export default async (directory, options={}) => {
  const extensions = options.extensions || EXTENSIONS;

  // collect all the module paths
  const relativePaths = [];
  await pWalk(directory, (relativePath, stats) => {
    if (relativePath === '') return true;
    if (stats.isDirectory()) {
      if (options.recursive) return true; // traverse directories
      
      // check for index file one level under the directory
      for (const extension of extensions) {
        const relativeIndexPath = path.join(relativePath, `index${extension}`);
        try {
          const indexStats = fs.statSync(path.join(directory, relativeIndexPath));
          if (indexStats.isFile()) {
            relativePaths.push(relativeIndexPath);
            break;
          }
        } catch (err) { /* no index */ }
      }
      return false; // do not traverse directories
    }
    if (~extensions.indexOf(path.extname(relativePath))) relativePaths.push(relativePath);
  }, true);

  // resolve all the module paths
  const results = options.paths ? {} : [];
  await Promise.all(relativePaths.map(async (relativePath) => {
    let module = await import(path.join(directory, relativePath));

    // es6 module so extract default by default unless asked not to
    if (path.extname(relativePath) === '.mjs') {
      if (!options.hasOwnProperty('default') || options.default) module = module.default;
    }

    // store result
    if (options.paths) results[relativePath] = module;
    else results.push(module);
  }));
  return results;
}
