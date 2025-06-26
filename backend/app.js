const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
require("./models");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const logger = require("./config/logger"); // To be created
const AppError = require("./utils/AppError"); // To be created

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());

// Rate limiting
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
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/store", require("./routes/storeItemRoutes"));
app.use("/api/menu", require("./routes/menuItemRoutes"));
app.use("/api/sales", require("./routes/saleRoutes"));
app.use("/api/hr", require("./routes/hrRoutes"));
app.use("/api/assets", require("./routes/assetRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

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

// Start server after DB sync
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();
