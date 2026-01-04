import dotenv from "dotenv";
dotenv.config();
import "./services/cronService.js";
import express from "express";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";

const allowedOrigins = [
  "https://vme-landing-page.onrender.com",
  "https://vme-landing-page-new-1.onrender.com",
  "http://localhost:5173",
];

const app = express();

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    return allowedOrigins.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedheaders: ["Content-Type", "Authorization"],
};

app.use((req, res, next) => {
  if (req.methid !== "OPTIONS") return next();
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  // If no origin or not allowed, respond without CORS headers
  return res.sendStatus(204);
});

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.originalUrl} from ${
      req.headers.origin || "no-origin"
    }`
  );
  next();
});

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
