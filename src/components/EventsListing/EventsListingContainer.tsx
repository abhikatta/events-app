import { API_BASE_URL } from "@/constants";
import { Event } from "@prisma/client";
import Events from "./EventsListing";
import { Session } from "next-auth";

const EventsContainer = async ({
    date,
    eventId,
    userSession,
}: {
    date: string;
    eventId: string | null;
    userSession: Session | null;
}) => {
    try {
        const user = userSession?.user;
        const res = await fetch(
            `${API_BASE_URL}/events?date=${date}&userEmail=${user?.email}`
        );
        const events: Event[] | { message: string } = await res.json();
        if ("message" in events) {
            throw new Error(events?.message.toString());
        } else {
            return (
                <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
                    <Events thisDate={date} events={events} eventId={eventId} />
                </div>
            );
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("error: ", error);
            return (
                <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
                    <p>{error.message}!</p>
                </div>
            );
        } else {
            return (
                <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
                    <p>Something went wrong! Please try again later.</p>
                </div>
            );
        }
    }
};

export default EventsContainer;
