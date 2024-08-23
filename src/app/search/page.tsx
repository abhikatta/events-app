// import EventsTable from "@/components/EventsTable/EventsTable";
import { API_BASE_URL } from "@/constants";
import { Event } from "@prisma/client";
import React from "react";

const Page = async () => {
    const res = await fetch(`${API_BASE_URL}/events/all`);
    const events: Event[] = await res.json();
    return (
        <div>
            search
            {/* <EventsTable events={events} /> */}
        </div>
    );
};

export default Page;
