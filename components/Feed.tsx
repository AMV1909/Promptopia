"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

import { PromptCard } from "./PromptCard";

interface Props {
    posts: Prompt[];
    handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ posts, handleTagClick }: Props) => (
    <div
        className={`grid xl:grid-cols-${
            posts.length > 3 ? 3 : posts.length
        } lg:grid-cols-${
            posts.length > 3 ? 2 : posts.length - 1
        } gap-4 mt-8 prompt-layout`}
    >
        {posts.map((post, index) => (
            <PromptCard
                key={index}
                post={post}
                handleTagClick={handleTagClick}
                handleUpdate={() => {}}
                handleDelete={() => {}}
            />
        ))}
    </div>
);

export function Feed() {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState<Prompt[]>([]);
    const pathName = usePathname();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search !== "") return;

        axios
            .get("/api/prompt/")
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, [search]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios
            .get(`/api/prompt/search/${search.replace("#", "")}`)
            .then((res) => setPosts(res.data))
            .catch(() => setPosts([]));
    };

    const handleTagClick = async (tag: string) => {
        if (pathName !== "/") return;

        setSearch(tag);
        setPosts(posts.filter((post) => post.tag.includes(tag)));
    };

    return (
        <section className="feed mb-10">
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl flex-center"
            >
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={search}
                    onChange={onChange}
                    className="search_input peer"
                />
            </form>

            <PromptCardList posts={posts} handleTagClick={handleTagClick} />
        </section>
    );
}
