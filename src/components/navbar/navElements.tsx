"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip, Button } from "@nextui-org/react";
import ThemeToggle from "../themeToggle/themToggle";

const NavElements = () => {
    console.log("Server side navelements: ", typeof window === "undefined");

    const pathname = usePathname();
    const navElements: { path: string; name: string }[] = [
        {
            path: "/",
            name: "Home",
        },
        {
            path: "/search",
            name: "Search",
        },
    ];
    return (
        <div className="flex flex-col items-center gap-3">
            <ThemeToggle />
            {navElements.map((item, index) => {
                return (
                    <Link href={item.path} key={index}>
                        {/* <Tooltip content={item.name}> */}
                        <Button
                            className={
                                pathname === item.path ? "" : `bg-softBg`
                            }>
                            {item.name}
                        </Button>
                        {/* </Tooltip> */}
                    </Link>
                );
            })}
        </div>
    );
};

export default NavElements;
