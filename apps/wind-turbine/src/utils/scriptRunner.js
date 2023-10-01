const { exec } = require('child_process');

function runPythonScript(scriptPath, callback) {
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return callback(error);
        }
        console.log(`stdout: ${stdout}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        callback(null, stdout);
    });
}

export default runPythonScript;
