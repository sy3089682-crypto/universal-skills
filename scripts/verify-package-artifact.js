#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function fail(message, details = []) {
  console.error(`\n✗ ${message}`);
  for (const detail of details) {
    console.error(`  - ${detail}`);
  }
  process.exit(1);
}

function ensure(condition, message, details = []) {
  if (!condition) {
    fail(message, details);
  }
}

const repoRoot = process.cwd();
const verificationSpec = {
  exact: [
    'package.json',
    'bin/universal-skills.js',
    'plugins/opencode/skill-router.ts',
    'scripts/install.sh',
    'scripts/install.ps1',
    'README.md',
    'LICENSE'
  ],
  prefixes: [
    'skills/'
  ]
};

let packResult;
let packedFilename;

try {
  const stdout = execFileSync('npm', ['pack', '--json', '--ignore-scripts'], {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });

  packResult = JSON.parse(stdout);
} catch (error) {
  fail('Unable to create an npm package artifact for verification.', [
    error.stderr?.toString().trim() || error.message
  ]);
}

ensure(Array.isArray(packResult) && packResult.length > 0, 'npm pack did not return artifact metadata.');

const artifact = packResult[0];
const files = Array.isArray(artifact.files) ? artifact.files : [];
const packedPaths = new Set(files.map((file) => file.path).filter(Boolean));
packedFilename = artifact.filename;

const missingExact = verificationSpec.exact.filter((requiredPath) => !packedPaths.has(requiredPath));
const missingPrefixes = verificationSpec.prefixes.filter(
  (requiredPrefix) => !files.some((file) => typeof file.path === 'string' && file.path.startsWith(requiredPrefix))
);

if (packedFilename) {
  const tarballPath = path.join(repoRoot, packedFilename);
  if (fs.existsSync(tarballPath)) {
    fs.unlinkSync(tarballPath);
  }
}

ensure(
  missingExact.length === 0 && missingPrefixes.length === 0,
  'The packed npm artifact is missing required runtime assets.',
  [
    ...missingExact.map((entry) => `Missing exact path: ${entry}`),
    ...missingPrefixes.map((entry) => `Missing required asset class: ${entry}`)
  ]
);

console.log('✓ npm package artifact includes the required runtime assets.');
console.log(`Verified ${packedPaths.size} packaged paths.`);
for (const requiredPath of verificationSpec.exact) {
  console.log(`  - ${requiredPath}`);
}
for (const requiredPrefix of verificationSpec.prefixes) {
  console.log(`  - ${requiredPrefix}*`);
}
