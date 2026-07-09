import express from "express";
import authRouter from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://inknotes.netlify.app/"],
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRoutes);

export default app;
