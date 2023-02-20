import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { dbConnect } from "./src/config/dbconfig.js";
const PORT = 8000;
const app = express();
import taskRouter from "./src/routers/taskRouter.js";

// dbconnect
dbConnect();

app.listen(8000, (error) => {
  error && console.log(error);
  console.log(`server is running at the port ${PORT}`);
});
// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(express.urlencoded())
// static content serve
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
// ///// global error handling
app.use((error, req, res, next) => {
  const status = error.status || 404;
  res.status(status).json({
    status: "error",
    message: error.message,
  });
});

// api end points
app.use("/api/v1/task", taskRouter);
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});
