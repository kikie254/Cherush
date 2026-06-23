import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually (basic key=value parser)
const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
let dbUrl = '';
for (const line of envFile.split('\n')) {
  const trimmed = line.trim();
  if (trimmed.startsWith('DATABASE_URL=')) {
    dbUrl = trimmed.slice('DATABASE_URL='.length).replace(/^["']|["']$/g, '');
    break;
  }
}

if (!dbUrl) {
  console.error('❌  DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = neon(dbUrl.replace(/[?&]channel_binding=[^&]*/g, (m) => m.startsWith('?') ? '?' : ''));
const result = await sql`SELECT 1 AS ok`;
console.log('✅  Neon connection successful:', result);

