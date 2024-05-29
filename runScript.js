// Import the 'child_process' module
const { spawn } = require('child_process');

// Set multiple environment variables
process.env.FIRSTNAME = 'Callum';
process.env.VERSION_NUMBER = '1.0.0';
process.env.SECRET = 's3cr3t';

// Log the environment variables to verify they're set
console.log('FIRSTNAME:', process.env.FIRSTNAME);
console.log('VERSION_NUMBER:', process.env.VERSION_NUMBER);
console.log('SECRET:', process.env.SECRET);

// Spawn the npm run dev command
const child = spawn('npm', ['run', 'dev'], { env: process.env, shell: true });

// Continuously print out the standard output
child.stdout.on('data', (data) => {
    console.log(`Stdout: ${data}`);
});

// Continuously print out the standard error
child.stderr.on('data', (data) => {
    console.error(`Stderr: ${data}`);
});

// Handle child process exit
child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
});
