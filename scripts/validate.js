const { resolve } = require('path');
const { readdir } = require('fs').promises;
// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require('ajv').default;
// eslint-disable-next-line import/no-extraneous-dependencies
const addFormats = require('ajv-formats').default;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

const ajv = new Ajv({
  logger: console,
  allErrors: true,
  verbose: true,
});

addFormats(ajv);
ajv.addKeyword('attestable');
ajv.addKeyword('transient');
ajv.addKeyword('credentialItem');
ajv.addKeyword('alias');
ajv.addKeyword('deambiguify');

(async () => {
  const files = await getFiles('./src/schemas');
  let errors = 0;
  files.forEach((file) => {
    try {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      ajv.addSchema(require(file));
    } catch (e) {
      errors += 1;
      console.log(`Error(s) in ${file}: ${e.message}`);
    }
  });

  console.log(`Checked ${files.length} schemas and found ${errors} errors`);

  if (errors > 0) {
    process.exit(1);
  }
})();
