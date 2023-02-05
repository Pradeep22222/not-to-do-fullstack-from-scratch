import mongoose from "mongoose";

export const dbConnect = () => {
    try {
        const MONGO_CLIENT = "mongodb://localhost/not_to_do_list_from_scratch";
        const conn = mongoose.connect(MONGO_CLIENT);
        conn && console.log("mongodb connected")
    } catch (error) {
        console.log(error);
    }
    
}
mongoose.set("strictQuery", false);
