# esm-import-directory

Import a directory of ES modules and return their exports.

```sh
npm install esm-import-directory
```

## Usage

```js
import path from 'path';
import { fileURLToPath } from 'url';
import importDirectory from 'esm-import-directory';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  // Returns an array of module exports.
  const typeDefs = await importDirectory(path.join(__dirname, 'typeDefs'));

  // Set paths to return an object keyed by relative file path.
  const typeDefPaths = await importDirectory(path.join(__dirname, 'typeDefs'), {
    paths: true,
  });
})();
```

The default extension is `.mjs`. By default, the promise resolves to an array of
default exports. Set `default: false` to keep each module's full namespace.

## Options

- recursive (boolean) - traverse modules recursively. Default: false.
- paths (boolean) - modules returned as an object with relative paths vs as an array. Default: false.
- filename (boolean) - only return the filename without the extension. Default: true for paths.
- default (boolean) - extract default from es6 modules. Default: true.
- extensions (array) - the file extension types to process. Default: ['.mjs']
