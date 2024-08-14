"use client";
import { useEffect, useState } from "react";
import { Calendar, DateValue, Button, useDisclosure } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Event } from "@prisma/client";
import EventModal from "../components/EventModal/EventModal";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [event, setEvent] = useState<Event[] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        setEvent([
            {
                id: "1",
                slug: "something",
                authorId: "sdasd",
                createdAt: new Date(),
                title: "get milk",
                description: "get milllk",
                priorityId: "low",
            },
            {
                id: "2",
                slug: "something2",
                authorId: "sdasd3",
                createdAt: new Date(),
                title: "get milk 1",
                description: "get milllk2 ",
                priorityId: "medium",
            },
        ]);
    }, []);
    return (
        <>
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
                    {event?.map((item) => {
                        return (
                            <Button
                                key={item.id}
                                onPress={() => {
                                    setSelectedEvent(item);
                                    onOpen();
                                }}
                                size="md">
                                {item.title}
                            </Button>
                        );
                    })}
                    {selectedEvent && (
                        <EventModal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            event={selectedEvent}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
