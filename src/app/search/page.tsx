import EventsTable from "@/components/EventsTable/EventsTable";
import { API_BASE_URL } from "@/constants";
import { Event } from "@prisma/client";
import React from "react";
import { auth } from "../../../auth";

const Page = async () => {
    console.log("Server side search: ", typeof window === "undefined");
    try {
        const user = (await auth())?.user;
        if (!user) {
            return <p>Please Login or create account to continue...</p>;
        }
        const res = await fetch(`${API_BASE_URL}/events/all`, {
            cache: "no-store",
        });
        const events: Event[] = await res.json();
        return (
            <div>
                search
                <EventsTable events={events} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <p>Something went Wrong!</p>;
    }
};

export default Page;
