import taskSchema from "./taskSchema.js";

export const addTask = (taskObj) => {
    return taskSchema(taskObj).save()
}