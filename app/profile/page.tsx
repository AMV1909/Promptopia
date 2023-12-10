"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Profile } from "@components";

export default function MyProfile() {
    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState<Prompt[]>([]);

    useEffect(() => {
        if (!session?.user._id) return;

        axios
            .get(`/api/users/${session.user._id}/posts`)
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, [session?.user._id]);

    const handleUpdate = (post: Prompt) => {
        router.push(`/update-prompt/${post._id}`);
    };

    const handleDelete = (post: Prompt) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        axios
            .delete(`/api/prompt/${post._id}`)
            .then(() => setPosts(posts.filter((p) => p._id !== post._id)))
            .catch((err) => console.log(err));
    };

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            posts={posts}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
        />
    );
}
