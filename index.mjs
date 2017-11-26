import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

export default async (directory, options={}) => {
  const fileNames = await promisify(fs.readdir)(directory);
  
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
