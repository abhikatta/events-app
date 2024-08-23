import { NextResponse } from "next/server";
import { prisma } from "../../../../client";
import { auth } from "../../../../auth";

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const slug = url.searchParams.get("date")!;
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
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            {
                status: 500,
            }
        );
    }
};

export const POST = async (req: Request) => {
    const user = (await auth())?.user;
    const url = new URL(req.url);
    const slug = url.searchParams.get("date")!;

    const body = await req.json();
    try {
        const createEvent = await prisma.event.create({
            data: {
                ...body,
                slug: slug,
                userEmail: user?.email,
            },
        });
        return new NextResponse(JSON.stringify(createEvent), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: `Could not create an event.` }),
            {
                status: 500,
            }
        );
    }
};
export const PATCH = async (req: Request) => {
    const user = (await auth())?.user;
    const url = new URL(req.url);
    const slug = url.searchParams.get("date")!;

    const body = await req.json();
    try {
        const updateEvent = await prisma.event.update({
            where: {
                id: body.id,
                slug: slug,
                userEmail: user?.email!,
            },
            data: {
                title: body.title,
                priority: body.priority,
                description: body.description,
            },
        });
        return new NextResponse(JSON.stringify(updateEvent), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Could not edit the event." }),
            { status: 200 }
        );
    }
};
export const DELETE = async (req: Request) => {
    const user = (await auth())?.user;
    const url = new URL(req.url);
    const slug = url.searchParams.get("date")!;
    try {
        const body = await req.json();
        const deleteEvent = await prisma.event.delete({
            where: {
                slug: slug,
                userEmail: user?.email!,
                id: body.id,
            },
        });
        return new NextResponse(JSON.stringify(deleteEvent), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: `Could not delete event.` }),
            {
                status: 500,
            }
        );
    }
};
