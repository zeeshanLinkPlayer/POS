import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "default-secret"
};

export default config;
