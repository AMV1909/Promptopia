import { PromptCard } from "./PromptCard";

interface Props {
    name: string;
    desc: string;
    posts: Prompt[];
    handleUpdate: (post: Prompt) => void;
    handleDelete: (post: Prompt) => void;
}

export function Profile({
    name,
    desc,
    posts,
    handleUpdate,
    handleDelete,
}: Props) {
    return (
        <section className="w-full">
            {name && (
                <>
                    <h1 className="head_text text-left">
                        <span className="blue_gradient">{name} Profile</span>
                    </h1>

                    <p className="desc text-left">{desc}</p>

                    <div
                        className={`${
                            posts.length > 1 && "flex"
                        } flex-wrap gap-4 mt-10 prompt-layout`}
                    >
                        {posts.map((post, index) => (
                            <PromptCard
                                key={index}
                                post={post}
                                handleUpdate={() => handleUpdate(post)}
                                handleDelete={() => handleDelete(post)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
