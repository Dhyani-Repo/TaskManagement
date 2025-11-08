  // import 'dotenv/config';
  require("dotenv").config({path:"./env"});

  import next from "next";
  // import expressApp from "./backend/index"
  import express from "express";
  import userRouter from "./backend/routes/user.route";
  import taskRouter from "./backend/routes/task.route";
  // import dotenv from "dotenv"
  // dotenv.config()





const dev = String(process.env.NODE_ENV) !== "production";
// console.log("ourt node env is :",dev)
const port = Number(process.env.PORT) || 3001
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

  app.use(express.json());

  app.use("/api/user", userRouter);
  app.use("/api/task", taskRouter);


nextApp.prepare().then(() => {

  // app.all("(/*)", (req, res) => handle(req, res));
  app.listen(port, () => console.log(` App running  ${port}`)  );

});
