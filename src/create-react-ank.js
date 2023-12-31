#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

  const packageJsonPath = path.join(destinationDirectory, 'package.json');
  const gitConfigPath = path.join(destinationDirectory, '.git/config');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const updatePackageJson = (fields, index) => {
      if (index < fields.length) {
        const field = fields[index];
        const existingValue = packageJson[field];
        readline.question(`Enter a value for ${field} in package.json${!!existingValue ? ` (or press Enter to keep the existing value: [${existingValue}])` : ''}: `, (input) => {
          if (input.trim() !== '') {
            packageJson[field] = input;
          }
          updatePackageJson(fields, index + 1);
        });
      } else {
        // Write the updated package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('Package.json updated with user-provided values.');

        // Remove [remote "origin"] and [branch "main"] from .git/config
        removeGitConfigSections(gitConfigPath, ['remote "origin"', 'branch "main']);
      }
    };

    const fieldsToUpdate = ['name', 'version', 'description', 'author', 'repository'];
    updatePackageJson(fieldsToUpdate, 0);
  } catch (error) {
    console.error('Error reading or updating package.json:', error);
  }
} else {
  console.error('Error cloning repository.');
  process.exit(1);
}

function removeGitConfigSections(filePath, sectionsToRemove) {
  // Remove the existing .git directory and initialize a new one
  const gitDirectory = path.join(destinationDirectory, '.git');
  if (fs.existsSync(gitDirectory)) {
    fs.rmdirSync(gitDirectory, { recursive: true });
  }

  const gitInitProcess = spawnSync('git', ['init', destinationDirectory]);

  if (gitInitProcess.status === 0) {
  } else {
    console.error('Error initializing a new Git repository.');
  }

  console.log(`The project has been created in "${destinationDirectory}"`);
  process.exit(0);
}
