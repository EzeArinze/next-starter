// 'dotenv/config' if you ara using .env.local or .env.*
// import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from './lib/env';

export default defineConfig({
  out: './db/migration',
  schema: './db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
