"use client";
import { useEffect, useState } from "react";
import { Calendar, DateValue, Button, useDisclosure } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Event } from "@prisma/client";
import EventModal from "../components/EventModal/EventModal";
import { DeleteIcon } from "@/components/themeToggle/icons";
import { deleteEvent } from "@/actions/server-actions";

const Page = () => {
    const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [events, setEvents] = useState<Event[] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await fetch(`/api/events/${date}`, {
                    cache: "no-cache",
                });
                const events: Event[] | null = await res.json();
                setEvents(events);
            } catch (error) {
                throw new Error(`Couldn't fetch data!", ${error}`);
            }
        };
        getEvents();
    }, [date]);
    return (
        <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
            <div className="w-auto">
                <Calendar
                    className="md:scale-125"
                    aria-label="Date (Controlled)"
                    defaultValue={date}
                    onChange={setDate}
                />
            </div>
            <div className="flex flex-col justify-center items-center w-max h-auto gap-10">
                <h2 className="text-3xl">{date?.toString()}</h2>
                {events?.map((item) => {
                    return (
                        <div key={item.id} className="flex gap-2 items-center">
                            <Button
                                variant="ghost"
                                onPress={() => {
                                    setSelectedEvent(item);
                                    onOpen();
                                }}
                                size="md">
                                {item.title}
                            </Button>
                            <form action={() => deleteEvent(date, item.id)}>
                                <button type="submit">
                                    <DeleteIcon width={30} height={30} />
                                </button>
                            </form>
                        </div>
                    );
                })}
                {
                    <Button
                        onClick={() => {
                            onOpen();
                            setSelectedEvent(null);
                        }}>
                        Create a new event
                    </Button>
                }

                <EventModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    event={selectedEvent}
                    date={date}
                />
            </div>
        </div>
    );
};

export default Page;
