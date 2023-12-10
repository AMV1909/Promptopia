"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import { Form } from "@components";

export default function UpdatePrompt() {
    const router = useRouter();
    const { id } = useParams();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        if (!id) return;

        axios
            .get(`/api/prompt/${id}`)
            .then((res) => setPost(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        await axios
            .put(`/api/prompt/${id}`, {
                prompt: post.prompt,
                tag: post.tag,
            })
            .then(() => router.push("/profile"))
            .catch((err) => console.log(err))
            .finally(() => setSubmitting(false));
    };

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleSubmit}
        />
    );
}
