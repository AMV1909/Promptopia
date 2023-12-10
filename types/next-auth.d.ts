import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: User;
    }

    interface Profile {
        email: string;
        name: string;
        picture: string;
    }
}
