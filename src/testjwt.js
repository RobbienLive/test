const { generateJWT, verifyJWT } = require('./core/jwt');
const Role = require('./core/roles');

function messWithPayload(jwt) {
  const [header, payload, signature] = jwt.split('.');
  let parsedPayload = JSON.parse(
    Buffer.from(payload, 'base64url').toString()
  );

  // make me admin please ^^
  console.log(parsedPayload.Roles);
  parsedPayload =  {test: "test"};

  const newPayload = Buffer.from(
    JSON.stringify(parsedPayload),
    'ascii'
  ).toString('base64url');
  return [header, newPayload, signature].join('.');
}

async function main() {
  const fakeUser =       {
    LastName: 'Van Duysen',
    FirstName: 'Robbe',
    DateOfBirth: '2000-10-10',
    Email: 'robbe.vanduysen@gmail.com',
    PhoneNumber: '0474123623',
    Adress: 'Kerkstraat 1, 1000 Brussel',
    Tak: 'groen',
    IsChief: true,
    GroupID: 1,
    Roles: JSON.stringify([Role.USER]),
  };

  const jwt = await generateJWT(fakeUser);
  // copy and paste the JWT in the textfield on https://jwt.io
  // inspect the content
  console.log('The JWT:', jwt);

  let valid = await verifyJWT(jwt);
  console.log('This JWT is', valid ? 'valid' : 'incorrect');

  // Let's mess with the payload
  const messedUpJwt = messWithPayload(jwt);
  console.log('Messed up JWT:', messedUpJwt);

  console.log('Verifying this JWT will throw an error:');
  valid = await verifyJWT(messedUpJwt);
}

main();