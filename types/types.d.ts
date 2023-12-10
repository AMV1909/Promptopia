declare type User = {
    _id: string;
    email: string;
    username: string;
    image: string;
};

declare type Prompt = {
    _id: string;
    creator: User;
    prompt: string;
    tag: string;
};

declare type UserAndPrompst = {
    user: User;
    prompts: Prompt[];
};
