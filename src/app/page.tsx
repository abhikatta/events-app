import EventsContainer from "@/components/EventsListing/EventsListingContainer";
import { auth } from "../../auth";
import { getLocalTimeZone, today } from "@internationalized/date";

const Page = async ({ searchParams }: { searchParams: URLSearchParams }) => {
    console.log("Server side /page: ", typeof window === "undefined");
    const urlSearchParams = new URLSearchParams(searchParams);
    const date =
        urlSearchParams.get("date") || today(getLocalTimeZone()).toString();

    const item = urlSearchParams.get("item") || null;

    const user = (await auth())?.user;
    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 h-auto items-center justify-center min-w-full">
            {user ? (
                <EventsContainer itemId={item} date={date} />
            ) : (
                <p>Please login or create an account to continue!</p>
            )}
        </div>
    );
};
export default Page;
