import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 8080,   // Railway will inject this
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "default-secret"
};

export default config;
