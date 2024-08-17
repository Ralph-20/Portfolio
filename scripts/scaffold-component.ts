/*
  Component Scaffolding 
*/
import fs from 'fs';
import path from 'path';
import generateComponentIndex from './templates/component-index';
import generateComponentScss from './templates/component-scss';
import generateComponentSrc from './templates/component-src';

const componentRootPath = './components';

// Format: <path>/<ComponentName>
const nameParamFormat = new RegExp(/^((?:[\w-]+\/)*)([A-Z][\w-]+)$/);
const componentArg = process.argv[2];

if (!componentArg) {
  throw 'Component name was not passed. Usage: jss scaffold <ComponentName>';
}

const regExResult = nameParamFormat.exec(componentArg);

if (regExResult === null) {
  throw `Component name should start with an uppercase letter and contain only letters, numbers,
dashes, or underscores. If specifying a path, it must be relative to src/components`;
}

const componentPath = regExResult[1];
const componentName = regExResult[2];

// console.log(chalk.green(`Scaffolding "${componentName}":`));
console.log(`Scaffolding "${componentName}":`);
scaffoldFile(
  componentRootPath,
  generateComponentScss(componentPath),
  `${componentName}.module.scss`
);

scaffoldFile(
  componentRootPath,
  generateComponentSrc(componentName, componentPath),
  `${componentName}.tsx`
);

scaffoldFile(componentRootPath, generateComponentIndex(componentName), `index.ts`);

/**
 * @param {string} content
 */
function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}

/**
 * Creates a file relative to the specified path if the file doesn't exist. Creates directories as needed.
 * @param {string} rootPath - the root path
 * @param {string} fileContent - the file content
 * @param {string} filename - the filename
 * @returns the new file's filepath
 */
function scaffoldFile(rootPath: string, fileContent: string, filename: string): string | null {
  const outputDir = path.join(rootPath, componentPath, componentName);
  const outputFile = path.join(outputDir, filename);

  if (fs.existsSync(outputFile)) {
    console.log(`Skipping creating ${outputFile}; already exists.`);
    return null;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, editLineEndings(fileContent), 'utf8');
  console.log(`- ${outputFile}`);
  return outputFile;
}
