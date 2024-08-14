import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import ThemeProvider from "../provider/themeProvider";
import ThemeContext from "../provider/themeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} m-0 p-0`}>
                <ThemeProvider>
                    <ThemeContext>
                        <div className="flex w-auto flex-col">
                            <div className="flex flex-row min-h-screen bg-bg text-color">
                                <Navbar />
                                <div className="flex flex-row w-full justify-center items-center">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </ThemeContext>
                </ThemeProvider>
            </body>
        </html>
    );
}
