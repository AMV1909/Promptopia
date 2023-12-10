import { connectDB } from "@database/db";
import { promptSchema } from "@models/promptSchema";

export const GET = async () => {
    try {
        await connectDB();

        const prompts = await promptSchema.find().populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to fetch all prompts", {
            status: 500,
        });
    }
};
