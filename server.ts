import "dotenv/config";          // load env
import express from "express";
import next from "next";
import { getRedis } from "./backend/utils/redis";
import userRouter from "./backend/routes/user.route";
import taskRouter from "./backend/routes/task.route";
import cookieParser from "cookie-parser"; 

const dev = process.env.NODE_ENV !== "production";
const port = Number(process.env.PORT) || 3001;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

// Redis init (singleton)
getRedis();

app.use(express.json());
app.use(cookieParser())

// API routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

nextApp.prepare().then(() => {
  app.listen(port, () => console.log(`App running on ${port}`));
});
