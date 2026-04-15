import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./auth/db.js";
import authRoute from "./auth/routes.js";
import cookieParser from "cookie-parser";
import Seat from "./models/seat.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Frontend")));

const allowedOrigins = [
  "http://localhost:8080",
  "http://127.0.0.1:5500",
  "https://booknow-flax.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      }  else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

const seedSeats = async () => {
  const count = await Seat.countDocuments();
  if (count === 0) {
    const seats = Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      isbooked: false,
      name: "",
    }));
    await Seat.insertMany(seats);
    console.log("Seeded seats into MongoDB");
  }
};

app.get("/seats", async (req, res, next) => {
  try {
    const seats = await Seat.find().sort({ id: 1 });
    res.json(seats);
  } catch (error) {
    next(error);
  }
});

app.put("/:id/:name", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const name = req.params.name;

    const seat = await Seat.findOneAndUpdate(
      { id, isbooked: false },
      { isbooked: true, name },
      { new: true },
    );

    if (!seat) {
      return res.status(400).json({ error: "Seat already booked" });
    }

    res.json(seat);
  } catch (error) {
    next(error);
  }
});

// 404 Catch-all (prevents dispatch crash)
app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const start = async () => {
  await connectDB();
  await seedSeats();
  app.listen(port, () => {
    console.log("Server starting on port: " + port);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
