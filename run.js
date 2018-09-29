const spawn = require('cross-spawn');

const path = require('path');

// const SEPARATOR = process.platform === 'win32' ? ';' : ':';
// const env = { ...process.env };

// env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

function runSpawnSync(cmd, args) {
  const proc = spawn(cmd, args, {
    cwd: process.cwd(),
    // env,
  });

  proc.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  proc.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  proc.on('exit', (code, signal) => {
    console.log('child process exited with '
      + `code ${code} and signal ${signal}`);
  });
}

runSpawnSync('npm run start');
