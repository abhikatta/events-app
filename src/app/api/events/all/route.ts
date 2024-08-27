import { NextResponse } from "next/server";
import { prisma } from "../../../../../client";
import { User } from "@prisma/client";

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const userEmail: User["email"] = url.searchParams.get("userEmail")!;
        const events = await prisma.event.findMany({
            where: {
                userEmail,
            },
        });

        return new NextResponse(JSON.stringify(events), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            {
                status: 500,
            }
        );
    }
};
