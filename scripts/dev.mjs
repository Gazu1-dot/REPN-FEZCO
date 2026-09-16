// Translate the managed preview flags for the existing Next.js project.
import { fileURLToPath } from 'node:url';
const supplied = process.argv.slice(2);
const args = supplied.filter(arg => arg !== '--strictPort').map(arg => arg === '--host' ? '--hostname' : arg);
process.env.REPN_DEV_PREVIEW = '1';
process.argv = [process.execPath, fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url)), 'dev', '--webpack', ...args];
await import('../node_modules/next/dist/bin/next');
