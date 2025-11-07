#!/usr/bin/env node
/**
 * MCP Notification Filter
 * Filters out unsupported notifications like keep-alive from MCP servers
 */

const { spawn } = require('child_process');
const readline = require('readline');

const [,, ...args] = process.argv;

if (args.length === 0) {
  console.error('Usage: mcp-filter.js <command> [args...]');
  process.exit(1);
}

const child = spawn(args[0], args.slice(1), {
  stdio: ['pipe', 'pipe', 'inherit']
});

const rl = readline.createInterface({
  input: child.stdout,
  crlfDelay: Infinity
});

// Forward stdin to child
process.stdin.pipe(child.stdin);

// Filter stdout from child
rl.on('line', (line) => {
  try {
    const message = JSON.parse(line);
    
    // Filter out keep-alive notifications
    if (message.method === 'notifications/keep-alive') {
      return; // Skip this message
    }
    
    // Forward all other messages
    console.log(line);
  } catch (e) {
    // If it's not JSON, just forward it
    console.log(line);
  }
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('MCP Filter Error:', err);
  process.exit(1);
});
