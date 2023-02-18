import express from "express";
import { addTask, deletemultipletasks, getAllTasks, getIndividualtask, updateTask } from "../model/task/taskModel.js";
const taskRouter = express.Router();

taskRouter.get("/:_id?", async(req, res, next) => {
  try {
    const { _id } = req.params;

   const result=_id?await getIndividualtask(_id):await getAllTasks()
    res.json({
      status: "success",
      message: "respose from get method",
      result
    });
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/", async(req, res, next) => {
  try {
    const data = req.body;
    const result = await addTask(data);
    result?._id
      ? res.json({
          status: "success", // either success or error
          messsage: "The new task has been added.",
        })
      : res.json({
          status: "error", // either success or error
          messsage: "Error, Unable to add new task, Please try again later",
          result,
        });
  } catch (error) {
    next(error);
  }
});
taskRouter.patch("/", async(req, res, next) => {
  try {
    const { _id, type } = req.body;
    const result = await updateTask(_id, type);
    res.json({
      status: "success",
      message: "respose from patch method",
      result,
    });
  } catch (error) {
    next(error);
  }
});
// taskRouter.patch("/", (req, res, next) => {
//   try {
//     res.json({
//       status: "success",
//       message: "respose from patch method",
//     });
//   } catch (error) {
//     next(error);
//   }
// });
taskRouter.delete("/", async(req, res, next) => {
  try {
    const ids = req.body;
    const result = await deletemultipletasks(ids);
    res.json({
      status: "success",
      message: "respose from delete method",
      result
    });
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
