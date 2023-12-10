import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@database/db";
import { userSchema } from "@models/userSchema";

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Missing env.GOOGLE_CLIENT_ID");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing env.GOOGLE_CLIENT_SECRET");
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async session({ session }) {
            try {
                if (!session.user) {
                    throw new Error("No user found");
                }

                const sessionUser = await userSchema.findOne({
                    email: session.user.email,
                });

                if (!sessionUser) {
                    throw new Error("User not found");
                }

                session.user._id = sessionUser._id.toString();

                return session;
            } catch (err) {
                console.log(err);
                return session;
            }
        },

        async signIn({ profile }) {
            try {
                if (!profile) {
                    throw new Error("No profile found");
                }

                if (!profile.email || !profile.name || !profile.picture) {
                    throw new Error("Missing profile information");
                }

                await connectDB();

                const userExists = await userSchema.exists({
                    email: profile.email,
                });

                if (!userExists) {
                    const usernameList = await userSchema.find({
                        username: {
                            $regex: profile.name
                                .replaceAll(" ", "")
                                .toLowerCase(),
                        },
                    });

                    if (usernameList.length > 0) {
                        profile.name += usernameList.length;
                    }

                    await userSchema.create({
                        email: profile.email,
                        username: profile.name
                            .replaceAll(" ", "")
                            .toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
