import { ReactNode } from "react";
import { Metadata } from "next";

import { Navbar, Provider } from "@components";

import "@styles/globals.css";

export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
    authors: [
        { name: "Axel Morales Vesga", url: "https://axel-amv.pages.dev" },
    ],
    icons: [
        {
            rel: "icon",
            url: "/images/logo.svg",
            href: "/images/logo.svg",
            type: "image/svg+xml",
            sizes: "140x140",
        },
    ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider session={undefined}>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}
