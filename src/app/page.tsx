"use client";
import { useEffect, useState } from "react";
import { Calendar, DateValue, Input } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

interface Priority {
    name: "Low" | "Medium" | "High";
    value: "low" | "medium" | "high";
}
interface Event {
    title: string;
    description?: string;
    priority: Priority;
}
const Page = () => {
    const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
    const [event, setEvent] = useState<Event | null>(null);

    return (
        <>
            <div className="flex flex-row gap-10">
                <div className="w-auto">
                    <Calendar
                        aria-label="Date (Controlled)"
                        defaultValue={date}
                        onChange={setDate}
                    />
                </div>
                <div className="flex flex-col justify-center items-center w-max h-auto gap-10">
                    <h2 className="text-3xl">{date?.toString()}</h2>
                    <Input
                        size="md"
                        width={300}
                        variant="underlined"
                        label="Create an event"
                        labelPlacement="outside"
                    />
                    <Input
                        size="md"
                        width={300}
                        variant="underlined"
                        label="Create an event"
                        labelPlacement="outside"
                    />
                </div>
            </div>
        </>
    );
};

export default Page;
