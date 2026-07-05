import express from "express";
import userAuthRouter from "./routes/userAuth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import notesRoutes from "./routes/notes.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", userAuthRouter);

app.use("/api/notes", notesRoutes);

export default app;
