"use client";

import {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    Dispatch,
    SetStateAction,
} from "react";
import axios from "axios";

import { PromptCard } from "./PromptCard";

interface Props {
    posts: Prompt[];
    setPosts: Dispatch<SetStateAction<Prompt[]>>;
    handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ posts, setPosts, handleTagClick }: Props) => (
    <div className="flex flex-wrap gap-4 mt-8 prompt-layout">
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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        axios
            .get("/api/prompt")
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, [search]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios
            .get(`/api/prompt/search/${search}`)
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch(() => setPosts([]));
    };

    const handleTagClick = async (tag: string) => {
        setPosts(posts.filter((post) => post.tag === tag));
    };

    return (
        <section className="feed mb-10">
            <form
                onSubmit={handleSubmit}
                className="relative w-full flex-center"
            >
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={search}
                    onChange={onChange}
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                posts={posts}
                setPosts={setPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
}
