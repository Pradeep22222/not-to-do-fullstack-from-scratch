import express from "express";
const taskRouter = express.Router();
let fakeDb = [
  { _id: "1", task: "coding", hr: "3" },
  { _id: "2", task: "sleeping", hr: "8" },
  { _id: "3", task: "netflix", hr: "2" },
];
taskRouter.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;
    let data = fakeDb;
    if (_id) {
      data = fakeDb.filter((item) => {
        item._id === _id;
      });
    }
    res.json({
      status: "success",
      message: "respose from get method",
      data
    });
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/", (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    fakeDb.push(data);
    res.json({
      status: "success",
      message: "respose from post method",
      fakeDb,
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.put("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from put method",
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.patch("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "respose from patch method",
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.delete("/", (req, res, next) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const filteredArg = fakeDb.filter((item) => item._id != _id);
    fakeDb = filteredArg;
    res.json({
      status: "success",
      message: "respose from delete method",
      fakeDb,
    });
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
