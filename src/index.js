const { CVCSchemaLoader } = require('@identity.com/credential-commons');

const identifierPattern = /(claim|credential|uca|type)-((\w+):[\w.:]+)-v(\d+)/;
const parseIdentifier = (identifier) => identifier.match(identifierPattern);

const getIdentifierPath = (identifier) => {
  let identifierPath;

  if (/^cvc:.*$/.test(identifier)) {
    identifierPath = `uca/1/${identifier}`;
  } else {
    const parsedIdentifier = parseIdentifier(identifier);

    if (parsedIdentifier) {
      identifierPath = `${parsedIdentifier[1]}/${parsedIdentifier[4]}/${parsedIdentifier[2]}`;
    }
  }

  return identifierPath;
};

class SchemaLoader extends CVCSchemaLoader {
  constructor(http = undefined, cache = undefined, schemaPath = undefined, logger) {
    super(http, cache, schemaPath);

    this.logger = logger;
  }

  async loadSchema(identifier) {
    let schema = this.loadLocalSchema(identifier);

    if (!schema) {
      logger.error(`@@@@@@@@@@ loading schema REMOTELY identifier: ${identifier} :: ${JSON.stringify(schema)}`);

      schema = super.loadSchema(identifier);
    }

    return schema;
  }

  // eslint-disable-next-line class-methods-use-this
  loadLocalSchema(identifier) {
    logger.error(`@@@@@@@@@@ loading schema for identifier: ${identifier}`);
    const path = getIdentifierPath(identifier);

    try {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const schema = require(`./schemas/${path}.schema.json`);
      logger.error(`@@@@@@@@@@ loading schema LOCALLY identifier: ${identifier} :: ${JSON.stringify(schema)}`);

      return schema;
    } catch (e) {
      logger.error('@@@@@@@@@@ error loading schema');
      logger.error(JSON.stringify(e.stack));
      return null;
    }
  }
}

module.exports = { SchemaLoader };
