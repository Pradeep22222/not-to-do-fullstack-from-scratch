import express from "express";
const taskRouter = express.Router();

taskRouter.get("/api/v1/task", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from get method",
    });
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/api/v1/task", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from post method",
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.put("/api/v1/task", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from put method",
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.patch("/api/v1/task", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from patch method",
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.delete("/api/v1/task", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from delete method",
    });
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
