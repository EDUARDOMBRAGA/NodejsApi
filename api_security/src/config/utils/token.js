import * as crypto from 'crypto';
const algorithm = process.env.ALGORITHM;

export {
    encrypt,
    decrypt
};

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = parseInt(process.env.IV_LENGTH); // For AES, this is always 16

function encrypt(obj) {
    try {
        let iv = crypto.randomBytes(parseInt(IV_LENGTH));
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(JSON.stringify(obj));

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (e) {
        return { error: e.message };

    }

}

function decrypt(text) {
    try {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString());
    } catch (e) {
        return { error: e.message };
    }
}
