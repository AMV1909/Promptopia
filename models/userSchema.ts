import { Schema, model, models } from "mongoose";

export const userSchema =
    models.user ||
    model(
        "user",
        new Schema(
            {
                email: {
                    type: String,
                    unique: [true, "Email already exists"],
                    required: [true, "Email is required"],
                },
                username: {
                    type: String,
                    unique: [true, "Username already exists"],
                    required: [true, "Username is required"],
                },
                image: {
                    type: String,
                    required: [true, "Image is required"],
                },
            },
            {
                versionKey: false,
            }
        )
    );
