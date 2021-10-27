# Civic Schemas

This project contains the JSON Schema's used to validate claims, credentials and UCAs.

These schema's are typically used via the [credential-commons](https://github.com/identity-com/credential-commons) 
identity library.

## Managing Schemas

### Adding new schema's
The various schema's are location in `src/schemas` and follow this format:

`type`/`version`/`schema`

For example,
`claim-cvc:PhoneNumber.extension-v1` (`type`-`schema`-v`version`) will be located at:

src/schemas/claim/1/cvc:PhoneNumber.extension.schema.json

### Publishing schemas to the Civic repository

NPM scripts take care of publishing to the separate stages:

`npm run publish:dev`

### Validating schemas

Schema's can be validated using AJV by running the following:

`npm run validate`

## Default Schema Loader

A default schema loader is provided allowing scema's to be embedded directly into a project, with a remote
fetch as a fallback if new schema's have been added remotely:

```javascript
const { SchemaLoader } = require('civic-schemas');

const loader = new SchemaLoader(httpImpl, storageImpl, remoteSchemaLocation); 
```
