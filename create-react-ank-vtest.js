#!/usr/bin/env node

const { spawn } = require('child_process');

const repositoryUrl = 'https://github.com/ankithg03/react-18-boilerplate';

const args = process.argv.slice(2);

const destinationDirectory = args[0] || './';

const cloneProcess = spawn('git', ['clone', repositoryUrl, destinationDirectory]);

cloneProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

cloneProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

cloneProcess.on('exit', (code) => {
  if (code === 0) {
    console.log('Repository cloned successfully.');
  } else {
    console.error('Error cloning repository.');
  }
});