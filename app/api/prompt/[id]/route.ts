import { NextRequest } from "next/server";

import { connectDB } from "@database/db";
import { promptSchema } from "@models/promptSchema";

interface Params {
    id: string;
}

export const GET = async (_: any, { params }: { params: Params }) => {
    try {
        await connectDB();

        const prompt = await promptSchema.findById(params.id);

        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to fetch user prompt", {
            status: 500,
        });
    }
};

export const PUT = async (req: NextRequest, { params }: { params: Params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectDB();

        const updatedPrompt = await promptSchema.findByIdAndUpdate(
            params.id,
            {
                prompt,
                tag,
            },
            {
                new: true,
            }
        );

        if (!updatedPrompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(updatedPrompt), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to update prompt", {
            status: 500,
        });
    }
};

export const DELETE = async (_: any, { params }: { params: Params }) => {
    try {
        await connectDB();

        const deletedPrompt = await promptSchema.findByIdAndDelete(params.id);

        if (!deletedPrompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(deletedPrompt), {
            status: 200,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to delete prompt", {
            status: 500,
        });
    }
};
