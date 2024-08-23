import { API_BASE_URL } from "@/constants";
import { Event } from "@prisma/client";
import Events from "./Events";
import { getLocalTimeZone, today } from "@internationalized/date";

const EventsContainer = async () => {
    try {
        const date = today(getLocalTimeZone());
        console.log(`api url: ${API_BASE_URL}/events?date=${date.toString()}`);

        const res = await fetch(
            `${API_BASE_URL}/events?date=${date.toString()}`
        );
        const events: Event[] = await res.json();
        console.log(events);

        return (
            <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
                <p>asdsadsa</p>
                <Events events={events} />
            </div>
        );
    } catch (error) {
        console.error("error: ", error);
        <div className="flex md:flex-row flex-col h-auto md:gap-0 gap-10 min-w-full md:justify-evenly items-center justify-center">
            <p>Something went wrong!, please try again later.</p>
        </div>;
    }
};

export default EventsContainer;
