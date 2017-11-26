Require a directory of .mjs module defaults using @std/esm in Node.js

Usage
=============

```js
import path from 'path';
import importDirectory from 'esm-import-directory';

const dirname = path.dirname(import.meta.url.replace('file://', ''));

export default async (options) => {
  // import as array, eg. [{ hello: 'world' }]
  const typeDefs = await importDirectory(path.join(dirname, 'typeDefs'));

  // import with paths, eg. { 'filename.mjs': { hello: 'world' } }
  const typeDefPaths = await importDirectory(path.join(dirname, 'typeDefs'), { paths: true });  
};
```
