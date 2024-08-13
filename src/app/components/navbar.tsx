"use client";
import Link from "next/link";
import { Tooltip, Button, useCalendarContext } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./themeToggle/themToggle";
const Navbar = () => {
    const pathname = usePathname();
    const navElements = [
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
        <section className="min-h-[80vh] flex w-[7rem] bg-softBg text-color justify-center items-center rounded-lg">
            <div className="flex flex-col items-center gap-3">
                <ThemeToggle />
                {navElements.map((item, index) => {
                    console.log(item.path);
                    return (
                        <Link href={item.path} key={index}>
                            <Tooltip content={item.name}>
                                <Button
                                    className={
                                        pathname === item.path
                                            ? ""
                                            : `bg-softBg`
                                    }>
                                    {item.name}
                                </Button>
                            </Tooltip>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Navbar;
