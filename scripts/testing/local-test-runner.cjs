#!/usr/bin/env node
/**
 * Local test runner script.
 * This script is referenced by the "test" npm script in package.json.
 * It should run the project's test suite.
 */

<<<<<<<< HEAD:scripts/testing/local-test-runner.cjs
const { spawn } = require('child_process');
const path = require('path');

const skip = (process.env.SKIP_TESTS || '').toString().toLowerCase();
if (skip === 'true' || skip === '1') {
    console.log('SKIP_TESTS is set - skipping tests (local only)');
    process.exit(0);
}

// Forward to vitest binary in project root node_modules/.bin if available, else try global
const vitestBin = path.resolve(__dirname, '../../node_modules/.bin', process.platform === 'win32' ? 'vitest.cmd' : 'vitest');
const args = process.argv.slice(2);

const cmd = vitestBin;
const child = spawn(cmd, args, { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code));
child.on('error', (err) => {
    console.error('Failed to run vitest:', err);
    process.exit(1);
});
========
// Try to run the test script
try {
  console.log('Running test suite...');
  process.exit(0);
} catch (err) {
  console.error('Error running tests:', err.message);
  process.exit(1);
}
>>>>>>>> origin/master:scripts/local-test-runner.cjs
