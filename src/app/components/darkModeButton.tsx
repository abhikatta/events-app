"use client";

import { useContext } from "react";
import { themeContext } from "../provider/themeProvider";

const DarkModeButton = () => {
    const { theme, themeToggle } = useContext(themeContext);
    return (
        <div
            onClick={() => {
                themeToggle();
                console.log(theme);
            }}>
            DarkModeButton
        </div>
    );
};

export default DarkModeButton;
