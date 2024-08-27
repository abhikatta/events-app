import EventsContainer from "@/components/EventsListing/EventsListingContainer";
import { auth } from "../../auth";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Session } from "next-auth";

const Page = async ({ searchParams }: { searchParams: URLSearchParams }) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    const date =
        urlSearchParams.get("date") || today(getLocalTimeZone()).toString();

    const eventId = urlSearchParams.get("event") || null;

    const userSession: Session | null = (await auth()) || null;
    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 h-auto items-center justify-center min-w-full">
            {userSession ? (
                <EventsContainer
                    userSession={userSession}
                    eventId={eventId}
                    date={date}
                />
            ) : (
                <p>Please login or create an account to continue!</p>
            )}
        </div>
    );
};
export default Page;
