import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../client";

export const GET = async (req: Request) => {
    try {
        const user = (await auth())?.user;
        const events = await prisma.event.findMany({
            where: {
                userEmail: user?.email!,
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
