import taskSchema from "./taskSchema.js";
// Create (add) task
export const addTask = (taskObj) => {
  return taskSchema(taskObj).save();
};
// Read (get) all tasks
export const getAllTasks = () => {
  return taskSchema.find();
};

// Read (get) individual task
export const getIndividualtask = (_id) => {
    return taskSchema.findById(_id);
}
// update 
export const updateTask = (_id, type) => {
    return taskSchema.findByIdAndUpdate(_id, { type }, { new: true})
}
// delete (single item)
export const deleteIndividualtask = (_id) => {
    return taskSchema.findByIdAndDelete(_id);
}

// delete (multiple item)
export const deletemultipletasks = (ids) => {
    return taskSchema.deleteMany({_id:{$in:ids}})
}