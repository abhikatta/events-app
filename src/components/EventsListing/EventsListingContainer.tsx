import { API_BASE_URL } from "@/constants";
import { Event } from "@prisma/client";
import Events from "./EventsListing";

const EventsContainer = async ({
    date,
    eventId,
}: {
    date: string;
    eventId: string | null;
}) => {
    console.log("Server side container: ", typeof window === "undefined");

    try {
        const res = await fetch(`${API_BASE_URL}/events?date=${date}`);
        const events: Event[] = await res.json();

        return (
            <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
                <Events thisDate={date} events={events} eventId={eventId} />
            </div>
        );
    } catch (error) {
        console.error("error: ", error);
        return (
            <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
                <p>Something went wrong! Please try again later.</p>
            </div>
        );
    }
};

export default EventsContainer;
