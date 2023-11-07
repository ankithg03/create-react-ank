#!/usr/bin/env node

const { spawnSync } = require('child_process');

const repositoryUrl = 'https://github.com/ankithg03/react-18-boilerplate';

function printHelp() {
  console.log(`Usage: create-react-ank [directory]
  
Clone the react-18-boilerplate repository to the specified directory.
If no directory is provided, it will clone the repository to the current working directory.`);
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

const destinationDirectory = args[0] || './';

const cloneProcess = spawnSync('git', ['clone', repositoryUrl, destinationDirectory]);

if (cloneProcess.status === 0) {
  console.log('Repository cloned successfully.');
} else {
  console.error('Error cloning repository.');
}
