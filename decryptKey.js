const fs = require('fs');
const crypto = require('crypto');

// Retrieve the password from the command line argument
const args = process.argv.slice(2);
const passwordIndex = args.indexOf('-P');
if (passwordIndex === -1 || passwordIndex === args.length - 1) {
    console.error('Please provide the password with the -P flag');
    process.exit(1);
}
const password = args[passwordIndex + 1];

try {
    const data = JSON.parse(fs.readFileSync('key.json', 'utf8'));
    const encryptedApiKey = data.public_api_key;

    const algorithm = 'aes-256-ecb';
    const key = crypto.createHash('sha256').update(password).digest();

    const decipher = crypto.createDecipheriv(algorithm, key, null);
    let decrypted = decipher.update(encryptedApiKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('Decrypted API key:', decrypted);
} catch (err) {
    console.error('Error decrypting the API key:', err.message);
    process.exit(1);
}
