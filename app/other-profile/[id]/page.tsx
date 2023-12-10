"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";

import { Profile } from "@components";

export default function OtherProfile() {
    const { data: session } = useSession();
    const { id } = useParams();

    const [user, setUser] = useState<UserAndPrompst["user"]>();
    const [posts, setPosts] = useState<Prompt[]>([]);

    useEffect(() => {
        if (!id) return;

        axios
            .get(`/api/users/${id}`)
            .then((res: { data: UserAndPrompst }) => {
                setUser(res.data.user);
                setPosts(res.data.prompts);
            })
            .catch((err) => console.log(err));
    }, [id, session?.user._id]);

    return (
        <Profile
            name={`${user?.username}'s`}
            desc=""
            posts={posts || []}
            handleUpdate={() => {}}
            handleDelete={() => {}}
        />
    );
}
