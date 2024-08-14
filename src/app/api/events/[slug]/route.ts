import { NextResponse } from "next/server";
import { prisma } from "../../../../../client";
import { Event } from "@prisma/client";

export const GET = async (
    req: Request,
    { params }: { params: { slug: string } }
) => {
    try {
        const events: Event[] = await prisma.event.findMany({
            where: {
                slug: params.slug,
            },
        });

        return new NextResponse(JSON.stringify(events), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
};
