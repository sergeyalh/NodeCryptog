const { createSign, createVerify, generateKeyPairSync } = require('crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
        // cipher: 'BombaClap-abc-123',
        // passphrase: 'top-verytop-secret'
    }
});

const { OprivateKey, OtherPublicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
        // cipher: 'BombaClap-abc-123',
        // passphrase: 'top-verytop-secret'
    }
});

const message = 'this data must be signed';

/// SIGN

const signer = createSign('rsa-sha256');

signer.update(message);

const signature = signer.sign(privateKey, 'hex');


/// VERIFY

const verifier = createVerify('rsa-sha256');

verifier.update(message);

const isVerified = verifier.verify(publicKey, signature, 'hex');

console.log(`Verified: ${isVerified}`)


const verifier2 = createVerify('rsa-sha256');

verifier2.update(message);
const isVerified2 = verifier2.verify(publicKey, signature, 'hex');

console.log(`Verified: ${isVerified2}`)