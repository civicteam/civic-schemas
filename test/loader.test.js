const { SchemaLoader } = require('../src');

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
});
