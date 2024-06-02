const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the API key: ', (apiKey) => {
    rl.question('Enter the password: ', (password) => {
        const algorithm = 'aes-256-ecb';
        const key = crypto.createHash('sha256').update(password).digest();

        const cipher = crypto.createCipheriv(algorithm, key, null);
        let encrypted = cipher.update(apiKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const output = {
            public_api_key: encrypted
        };

        fs.writeFileSync('key.json', JSON.stringify(output, null, 2));
        console.log('Encrypted API key saved to key.json');

        rl.close();
    });
});
