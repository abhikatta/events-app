"use client";
import { useEffect, useState } from "react";
import { Calendar, DateValue, Input } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

const Page = () => {
    const [date, setDate] = useState<DateValue>();
    const [eventTitle, setEventTitle] = useState("");
    useEffect(() => {
        setDate(today(getLocalTimeZone()));
    }, []);
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
                        onChange={(e) => setEventTitle(e.target.value)}
                        label="Create an event"
                        labelPlacement="outside"
                    />
                    <p>{eventTitle}</p>
                </div>
            </div>
        </>
    );
};

export default Page;
