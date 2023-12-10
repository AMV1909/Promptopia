import { connectDB } from "@database/db";
import { promptSchema } from "@models/promptSchema";
import { userSchema } from "@models/userSchema";

interface Params {
    search: string;
}

export const GET = async (_: any, { params }: { params: Params }) => {
    try {
        await connectDB();

        const prompt = await promptSchema
            .find({
                $or: [
                    {
                        tag: {
                            $regex: params.search,
                            $options: "i",
                        },
                    },
                    {
                        prompt: {
                            $regex: params.search,
                            $options: "i",
                        },
                    },
                ],
            })
            .populate("creator");

        if (prompt.length > 0) {
            return new Response(JSON.stringify(prompt), {
                status: 200,
            });
        }

        const creator = await userSchema.findOne({
            username: {
                $regex: params.search,
                $options: "i",
            },
        });

        if (creator) {
            const searchForCreator = await promptSchema
                .find({
                    creator: creator._id,
                })
                .populate("creator");

            if (searchForCreator.length > 0) {
                return new Response(JSON.stringify(searchForCreator), {
                    status: 200,
                });
            }
        }

        return new Response("No results found", {
            status: 404,
        });
    } catch (err) {
        console.log(err);

        return new Response("Failed to fetch user prompt", {
            status: 500,
        });
    }
};
