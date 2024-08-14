"use client";
import { useContext } from "react";
import { themeContext } from "../../provider/themeProvider";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "./icons";
const ThemeToggle = () => {
    const { theme, themeToggle } = useContext(themeContext);
    return (
        <Switch
            isSelected={theme === "dark"}
            onClick={themeToggle}
            size="lg"
            className="bg-inherit"
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <MoonIcon className={className} />
                ) : (
                    <SunIcon className={className} />
                )
            }
        />
    );
};

export default ThemeToggle;
