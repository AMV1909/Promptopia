import { connect, set } from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("Missing env.MONGODB_URI");
        }

        await connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log("MongoDB is connected");
    } catch (err) {
        console.log(err);
    }
};
