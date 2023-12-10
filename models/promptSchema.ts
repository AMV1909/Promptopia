import { Schema, model, models } from "mongoose";

export const promptSchema =
    models.prompt ||
    model(
        "prompt",
        new Schema(
            {
                creator: {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                    required: [true, "Creator is required"],
                },
                prompt: {
                    type: String,
                    required: [true, "Prompt is required"],
                },
                tag: {
                    type: String,
                    required: [true, "Tag is required"],
                },
            },
            {
                versionKey: false,
            }
        )
    );
