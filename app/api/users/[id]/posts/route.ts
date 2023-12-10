import { connectDB } from "@database/db";
import { promptSchema } from "@models/promptSchema";

interface Params {
    id: string;
}

export const GET = async (_: any, { params }: { params: Params }) => {
    try {
        await connectDB();

        const prompts = await promptSchema
            .find({
                creator: params.id,
            })
            .populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to fetch user prompts", {
            status: 500,
        });
    }
};
