import EventsContainer from "@/components/Events/Container";
import { auth } from "../../auth";
const Page = async () => {
    const user = (await auth())?.user;
    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 h-auto items-center justify-center min-w-full">
            {user ? (
                <EventsContainer />
            ) : (
                <p>Please login or create an account to continue!</p>
            )}
        </div>
    );
};
export default Page;
