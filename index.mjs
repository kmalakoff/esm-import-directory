import path from 'path';
import fs from 'fs';
import pify from 'pify';

const readdir = pify(fs.readdir);

export default async (directory, options={}) => {
  const fileNames = await readdir(directory);

  const modules = options.paths ? {} : [];
  for (const fileName of fileNames) {
    const fullPath = path.join(directory, fileName);
    try {
      const module = await import(fullPath);
      if (module.default) {
        if (options.paths) modules[fileName] = module.default;
        else modules.push(module.default);
      }
    } catch (err) { /* not a module */ }
  }
  return modules;
}
