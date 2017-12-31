## esm-import-directory

Import a directory of modules using @std/esm

**Usage**

```js
import path from 'path';
import importDirectory from 'esm-import-directory';

const dirname = path.dirname(import.meta.url.replace('file://', ''));

(async () => {
  // import as array, eg. [{ hello: 'world' }]
  const typeDefs = await importDirectory(path.join(dirname, 'typeDefs'));

  // import with paths, eg. { 'filename.mjs': { hello: 'world' } }
  const typeDefPaths = await importDirectory(path.join(dirname, 'typeDefs'), {
    paths: true
  });
})();
```

**Options**

* recursive (boolean) - traverse modules recursively. Default: false.
* paths (boolean) - modules returned as an object with relative paths vs as an array. Default: false.
* filename (boolean) - only return the filename without the extension. Default: false.
* default (boolean) - extract default from es6 modules. Default: true.
* extensions (array) - the file extension types to process. Default: ['.mjs']
