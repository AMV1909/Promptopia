import { connectDB } from "@database/db";
import { userSchema } from "@models/userSchema";
import { promptSchema } from "@models/promptSchema";

interface Params {
    id: string;
}

export const GET = async (_: any, { params }: { params: Params }) => {
    try {
        await connectDB();

        const user = await userSchema.findById(params.id);

        if (!user) {
            return new Response("User not found", {
                status: 404,
            });
        }

        const prompts = await promptSchema
            .find({
                creator: user._id,
            })
            .populate("creator");

        return new Response(JSON.stringify({ user, prompts }), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to fetch user prompt", {
            status: 500,
        });
    }
};
