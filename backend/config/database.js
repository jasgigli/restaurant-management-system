import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

// Load env vars
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
