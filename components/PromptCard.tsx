"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
    post: Prompt;
    handleTagClick?: (tag: string) => void;
    handleUpdate: () => void;
    handleDelete: () => void;
}

export function PromptCard({
    post,
    handleTagClick,
    handleUpdate,
    handleDelete,
}: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const pathName = usePathname();

    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);

        setTimeout(() => setCopied(""), 3000);
    };

    const goToProfile = () => {
        if (pathName !== "/") return;

        router.push(`/other-profile/${post.creator._id}`);
    };

    return (
        <div className="prompt_card lg:max-w-max">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain cursor-pointer"
                        onClick={goToProfile}
                    />

                    <div className="flex flex-col">
                        <h3
                            className="font-satoshi font-semibold text-gray-900 cursor-pointer"
                            onClick={goToProfile}
                        >
                            {post.creator.username}
                        </h3>

                        <p
                            className="font-inter text-sm text-gray-500 cursor-pointer"
                            onClick={goToProfile}
                        >
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={
                            copied === post.prompt
                                ? "/icons/tick.svg"
                                : "/icons/copy.svg"
                        }
                        alt="copy"
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>

            <p
                className="font-inter text-sm blue_gradient cursor-pointer inline-block"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>

            {session?.user._id === post.creator._id &&
                pathName === "/profile" && (
                    <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                        <p
                            className="font-inter text-sm green_gradient cursor-pointer"
                            onClick={handleUpdate}
                        >
                            Update
                        </p>

                        <p
                            className="font-inter text-sm orange_gradient cursor-pointer"
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
        </div>
    );
}
