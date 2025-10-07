#!/usr/bin/env node
// Minimal tag-manager.cjs for rollback workflow (CommonJS)
const { execSync } = require('child_process');
const args = process.argv.slice(2);

function usage() {
  console.log('Usage: node tag-manager.cjs <validate|create> <env> [--message="msg"] [--push]');
  process.exit(1);
}

if (args.length < 2) {
  usage();
}
const command = args[0];
const env = args[1];
if (!['staging', 'production'].includes(env)) {
  usage();
}

function getTags(pattern) {
  try {
    const tags = execSync(`git tag -l "${pattern}" --sort=-committerdate`, { encoding: 'utf8' });
    return tags.split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

if (command === 'validate') {
  const tags = getTags(`${env}-*`);
  if (tags.length >= 2) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

if (command === 'create') {
  // Parse message and push
  let message = '';
  let push = false;
  for (let i = 2; i < args.length; i++) {
    if (args[i].startsWith('--message=')) {
      message = args[i].replace('--message=', '');
    }
    if (args[i] === '--push') {
      push = true;
    }
  }
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const tagName = `${env}-${timestamp}`;
  try {
    execSync(`git tag -a ${tagName} -m "${message || 'Rollback tag'}"`);
    if (push) {
      execSync(`git push origin ${tagName}`);
    }
    console.log(`Created tag: ${tagName}`);
    process.exit(0);
  } catch (e) {
    console.error('Failed to create tag:', e.message);
    process.exit(1);
  }
}

usage();
