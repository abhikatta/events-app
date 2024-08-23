import { NextResponse } from "next/server";
import { prisma } from "../../../../client";
import { auth } from "../../../../auth";

export const GET = async (req: Request) => {
    try {
        // Extract date from query parameters
        const url = new URL(req.url);
        const slug = url.searchParams.get("date")!;

        // Authenticate user
        const user = (await auth())?.user;

        const events = await prisma.event.findMany({
            where: {
                slug: slug,
                userEmail: user?.email!,
            },
        });

        return new NextResponse(JSON.stringify(events), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return new NextResponse("Internal Server Error", {
            status: 500,
        });
    }
};

export const POST = async (
    req: Request,
    { params }: { params: { slug: string } }
) => {
    const user = (await auth())?.user;
    if (!user) {
        return new NextResponse("Pleae login to create an event", {
            status: 401,
        });
    }
    try {
        const body = await req.json();
        const createEvent = await prisma.event.create({
            data: {
                ...body,
                slug: params.slug,
                userEmail: user.email,
            },
        });
        return new NextResponse(JSON.stringify(createEvent), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(`Could not create an event ${error}`, {
            status: 500,
        });
    }
};
export const PATCH = async (
    req: Request,
    { params }: { params: { slug: string } }
) => {
    const user = (await auth())?.user;
    if (!user) {
        return new NextResponse("Pleae login to create an event", {
            status: 401,
        });
    }
    try {
        const body = await req.json();
        const updateEvent = await prisma.event.update({
            where: {
                id: body.id,
                slug: params.slug,
                userEmail: user.email!,
            },
            data: body,
        });
        return new NextResponse(JSON.stringify(updateEvent), { status: 200 });
    } catch (error) {
        console.log(error);
    }
};
export const DELETE = async (
    req: Request,
    { params }: { params: { slug: string } }
) => {
    const user = (await auth())?.user;
    if (!user) {
        return new NextResponse("Pleae login to create an event", {
            status: 401,
        });
    }
    try {
        const body = await req.json();
        const deleteEvent = await prisma.event.delete({
            where: {
                slug: params.slug,
                userEmail: user.email!,
                id: body.id,
            },
        });
        return new NextResponse(JSON.stringify(deleteEvent), { status: 200 });
    } catch (error) {}
};
