import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/database.js";
import logger from "./config/logger.js";
import "./models/index.js";
import { AppError } from "./utils/appError.js";

const app = express();
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", apiLimiter);

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Logging
app.use(morgan("combined", { stream: logger.stream }));

// Routes
import assetRoutes from "./routes/assetRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import storeItemRoutes from "./routes/storeItemRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/store", storeItemRoutes);
app.use("/api/menu", menuItemRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/reports", reportRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
  // Sequelize errors
  if (err.name && err.name.startsWith("Sequelize")) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  // CORS errors
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ status: "error", message: err.message });
  }
  // Generic server error
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Check for required global environment variables
const requiredGlobals = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASS",
  "DB_NAME",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "CORS_ORIGIN",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "PORT",
];
const missingGlobals = requiredGlobals.filter((v) => !process.env[v]);
if (missingGlobals.length > 0) {
  logger.error(
    `❌ Missing required environment variables: ${missingGlobals.join(", ")}`
  );
  process.exit(1);
}

// Start server after DB sync
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync();
    logger.info("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();
