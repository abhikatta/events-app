"use client";
import { Button, Calendar, useDisclosure } from "@nextui-org/react";
import { Event } from "@prisma/client";
import { DeleteIcon } from "../themeToggle/icons";
import EventModal from "../EventModal/EventModal";
import { useEffect, useMemo, useState } from "react";
import { parseDate } from "@internationalized/date";
import { useRouter } from "next/navigation";
import { revalidate } from "@/actions/server-actions";

const Events = ({
    events,
    itemId,
    thisDate,
}: {
    thisDate: string;
    events: Event[] | null;
    itemId: string | null;
}) => {
    console.log("Server side events: ", typeof window === "undefined");

    const router = useRouter();
    const searchParams = useMemo(() => new URLSearchParams(), []);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [date, setDate] = useState<string>(thisDate);

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    useEffect(() => {
        if (itemId) {
            const item = events?.find((item) => item.id === itemId) || null;
            setSelectedEvent(item);
            onOpen();
        } else {
            searchParams.set("date", date.toString());
            router.push(`?${searchParams.toString()}`);
        }
    }, [date, events, itemId, onOpen, router, searchParams]);

    const deleteEvent = async (event: Event) => {
        await fetch(`/api/events?date=${date.toString()}`, {
            method: "DELETE",
            body: JSON.stringify({
                id: event.id,
            }),
        });
        revalidate("/events");
    };

    return (
        <>
            <div className="w-auto">
                <Calendar
                    className="md:scale-125"
                    aria-label="Date (Controlled)"
                    defaultValue={
                        typeof date === "string" ? parseDate(date) : date
                    }
                    onChange={(e) => setDate(e.toString())}
                />
            </div>
            <div className="flex flex-col justify-center items-center w-max h-auto gap-10">
                <h2 className="text-3xl">{date?.toString()}</h2>
                {events?.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-2a ">
                            <Button
                                variant="ghost"
                                onPress={() => {
                                    setSelectedEvent(item);
                                    onOpen();
                                }}
                                size="md">
                                {item.title}
                            </Button>
                            <form action={() => deleteEvent(item)}>
                                <button type="submit" className="h-full">
                                    <DeleteIcon color="gray" />
                                </button>
                            </form>
                        </div>
                    );
                })}

                <Button
                    onClick={() => {
                        onOpen();
                        setSelectedEvent(null);
                    }}>
                    Create a new event
                </Button>
                <EventModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    event={selectedEvent}
                    date={date.toString()}
                />
            </div>
        </>
    );
};

export default Events;
