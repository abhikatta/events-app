"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
    const route = useSearchParams();
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
            <div className="flex flex-col gap-3">
                {navElements.map((item, index) => {
                    return (
                        <Link
                            href={item.path}
                            className={`${
                                route.has(item.path)
                                    ? " underline underline-softBg underline-offset-2"
                                    : ""
                            }`}
                            key={index}>
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Navbar;
