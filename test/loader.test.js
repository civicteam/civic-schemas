const { schemaLoader } = require('@identity.com/credential-commons');
const { SchemaLoader } = require('../src');

jest.setTimeout(50000);
describe('Schema loader', () => {
  it('should load a valid schema', async () => {
    const loader = new SchemaLoader();

    const schema = await loader.loadSchema('credential-cvc:Email-v1');

    expect(schema).toBeTruthy();
  });

  it('should not load an invalid schema', async () => {
    const loader = new SchemaLoader();

    const schema = await loader.loadSchema('credential-cvc:Invalid-v1');

    expect(schema).toBeNull();
  });

  it('should load multiple schemas', async () => {
    schemaLoader.addLoader(new SchemaLoader(undefined, null));

    const initTime = new Date().getTime();
    await schemaLoader.loadSchemaFromTitle('claim-cvc:Address.country-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:Email-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:GenericDocumentId-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:IdDocument-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:IdDocument-v2');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:Identity-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:IDVaaS-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:PhoneNumber-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:UnverifiedAddress-v1');
    await schemaLoader.loadSchemaFromTitle('credential-cvc:UnverifiedSsn-v1');

    console.log(`Loaded ${schemaLoader.credentialDefinitions.length} credentials, 
    ${schemaLoader.definitions.length} claims,
     in ${(new Date().getTime() - initTime) / 1000} seconds`);
  });
});
