const { spawn } = require('child_process');

// Start Flask API
const flask = spawn('python', ['apps/flask_api/app.py'], {
    stdio: 'inherit',
    shell: true,
});

// Start Next.js App
const nextjs = spawn('npm', ['run', 'dev'], {
    cwd: './apps/wind-turbine',
    stdio: 'inherit',
    shell: true,
});

flask.on('close', (code) => {
    console.log(`Flask app exited with code ${code}`);
});

nextjs.on('close', (code) => {
    console.log(`Next.js app exited with code ${code}`);
});
