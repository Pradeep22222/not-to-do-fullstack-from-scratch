import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        maxLength:50
    },
    hr: {
        type: Number,
        required: true,
        max:368
  },
    type: {
        type: String,
        default:"entry"
  },
});
export default mongoose.model("task", taskSchema);