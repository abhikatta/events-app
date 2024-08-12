"use client";
import { createContext, useState } from "react";

export type themeType = "light" | "dark";
export interface ITheme {
    theme: themeType;
    themeToggle: () => void;
}

export const getTheme = (): themeType => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("theme") as themeType;
    }
    return "dark";
};

export const themeContext = createContext<ITheme>({
    theme: "light",
    themeToggle: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
    const [theme, setTheme] = useState(() => getTheme());

    const themeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <themeContext.Provider value={{ theme, themeToggle }}>
            {children}
        </themeContext.Provider>
    );
};
export default ThemeProvider;
