import EventsContainer from "@/components/Events/Container";
import { auth } from "../../auth";
import { getLocalTimeZone, today } from "@internationalized/date";

const Page = async ({ searchParams }: { searchParams: { date: string } }) => {
    const user = (await auth())?.user;
    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 h-auto items-center justify-center min-w-full">
            {user ? (
                <EventsContainer
                    date={
                        searchParams.date
                            ? searchParams.date
                            : today(getLocalTimeZone()).toString()
                    }
                />
            ) : (
                <p>Please login or create an account to continue!</p>
            )}
        </div>
    );
};
export default Page;
