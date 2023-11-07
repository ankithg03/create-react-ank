#!/usr/bin/env node

const { spawnSync } = require('child_process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

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

  const packageJsonPath = `${destinationDirectory}/package.json`;

  const fs = require('fs');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const updatePackageJson = (field, defaultValue) => {
      const existingValue = packageJson[field] || defaultValue;
      readline.question(`Enter a value for ${field} in package.json (or press Enter to keep the existing value: [${existingValue}]): `, (input) => {
        if (input.trim() !== '') {
          packageJson[field] = input;
        } else {
          packageJson[field] = defaultValue;
        }

        if (field === 'repository') {
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
          console.log('Package.json updated with user-provided values.');
          readline.close();
        } else {
          updatePackageJson('name', packageJson.name);
        }
      });
    };

    updatePackageJson('name', packageJson.name);
  } catch (error) {
    console.error('Error reading or updating package.json:', error);
  }
} else {
  console.error('Error cloning repository.');
  process.exit(1);
}
