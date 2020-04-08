import path from 'path';
import fs from 'fs';
import pify from 'pify';
import walk from 'walk-filtered';

const pStat = pify(fs.lstat);
const DEFAULT_OPTIONS = {
  recursive: false,
  paths: false,
  default: true,
  extensions: ['.mjs'],
};

function fileName(relativePath) {
  return path.basename(relativePath, path.extname(relativePath));
}

function fileDirName(relativePath) {
  const dirname = path.dirname(relativePath);
  const filename = fileName(relativePath);
  return path.join(dirname, filename);
}

function setResult(results, key, module) {
  if (results[key] !== undefined) {
    const value = Array.isArray(results[key]) ? results[key] : [results[key]];
    results[key] = value.concat(module); // eslint-disable-line no-param-reassign
  } else results[key] = module;
}

async function importFile(directory, relativePath, options, results) {
  let module = await import(path.join(directory, relativePath));

  // es6 module so extract default by default unless asked not to
  if (path.extname(relativePath) === '.mjs') {
    if (options.default === undefined || options.default) {
      // check default
      if (module.default === undefined) return; // no default
      module = module.default;
    }
  }

  // collect result
  if (options.paths) setResult(results, options.filename ? fileDirName(relativePath) : relativePath, module);
  else if (options.filename) setResult(results, fileName(relativePath), module);
  else results.push(module); // eslint-disable-line no-param-reassign
}

export default async (directory, options = {}) => {
  options = Object.assign({}, DEFAULT_OPTIONS, options); // eslint-disable-line no-param-reassign
  if (options.paths && options.filename === undefined) options.filename = true;
  const results = options.paths || options.filename ? {} : [];

  await walk(
    directory,
    async (entry) => {
      if (entry.path === '') return true;

      if (entry.stats.isDirectory()) {
        if (!options.recursive) return true; // will pick up in traverse

        // check for index file one level under the directory
        for (const extension of options.extensions) {
          const relativeIndexPath = path.join(entry.path, `index${extension}`);

          // check for index file one directly down
          try {
            const indexStats = await pStat(entry.fullPath);
            if (indexStats && !indexStats.isDirectory()) {
              await importFile(directory, relativeIndexPath, options, results);
              return false; // found index so do not traverse further
            }
          } catch (err) {
            /* no index */
          }
        }
      } else {
        const extension = path.extname(entry.path);
        if (~options.extensions.indexOf(extension)) await importFile(directory, entry.path, options, results);
        return true; // traverse
      }
    },
    { stats: true, depth: options.recursive ? Infinity : 0 }
  );

  return results;
};
