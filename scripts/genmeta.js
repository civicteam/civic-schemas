const fs = require('fs');

const allClaims = [];
const notFoundClaims = [];

const stripExtension = (string) => string.replace(/\.schema\.json$/, '');

fs.readdirSync('./src/schemas/claim/1').forEach((file) => {
  allClaims.push(`claim-${stripExtension(file)}-v1`);
});

fs.readdirSync('./src/schemas/uca/1').forEach((file) => {
  const parts = stripExtension(file).split(':');
  const claim = `claim-cvc:${parts[1]}.${parts[2]}-v1`;

  if (!allClaims.includes(claim)) {
    notFoundClaims.push(claim);
  }
});

fs.writeFileSync('./src/schemas/meta.json', JSON.stringify({ uca: notFoundClaims }, null, 2));
