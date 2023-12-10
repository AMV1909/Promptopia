"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Form } from "@components";

export default function CreatePrompt() {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        await axios
            .post("/api/prompt/new", {
                prompt: post.prompt,
                userId: session?.user?._id,
                tag: post.tag,
            })
            .then(() => router.push("/"))
            .catch((err) => console.log(err))
            .finally(() => setSubmitting(false));
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleSubmit}
        />
    );
}
