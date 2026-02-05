import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://stagehype_user:stagehype_pass@127.0.0.1:5432/stagehype_db";

export default defineConfig({
  datasource: {
    url: connectionString,
    adapter: new PrismaPg(new Pool({ connectionString })),
  },
});
