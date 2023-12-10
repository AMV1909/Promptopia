import { NextRequest } from "next/server";

import { connectDB } from "@database/db";
import { promptSchema } from "@models/promptSchema";

export const POST = async (req: NextRequest) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectDB();

        const newPrompt = await promptSchema.create({
            creator: userId,
            prompt,
            tag,
        });

        return new Response(JSON.stringify(newPrompt), {
            status: 201,
        });
    } catch (err) {
        console.log(err);

        return new Response(JSON.stringify(err), {
            status: 500,
        });
    }
};
