const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

const encryptStringWithRsaPublicKey = function (toEncrypt, relativeOrAbsolutePathToPublicKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    const publicKey = fs.readFileSync(absolutePath);
    const buffer = Buffer.from(toEncrypt, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
};

const decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathtoPrivateKey, passphrase='') {
    const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    const privateKey = fs.readFileSync(absolutePath);
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt({
        key: privateKey.toString(),
        passphrase
    }, buffer);

    return decrypted.toString('utf8');
};

module.exports = {
    encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey
}
