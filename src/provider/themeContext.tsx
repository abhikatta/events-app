"use client";
import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "./themeProvider";

const ThemeContext = ({ children }: { children: React.ReactElement }) => {
    const { theme } = useContext(themeContext);
    const [isMounted, setIsMounted] = useState<boolean>();
    useEffect(() => setIsMounted(true), []);
    return isMounted ? <div className={theme}>{children}</div> : null;
};

export default ThemeContext;
