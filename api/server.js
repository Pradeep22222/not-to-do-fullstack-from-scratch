import express from "express";
const PORT = 8000;
const app = express();
import taskRouter from "./src/routers/taskRouter.js";
app.listen(8000, (error) => {
  error && console.log(error);
  console.log(`server is running at the port ${PORT}`);
});
// middlewares
app.use(express.json());
// app.use(express.urlencoded())

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
app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "response from the root url",
  });
});
