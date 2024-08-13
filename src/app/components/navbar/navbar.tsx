import { Button } from "@nextui-org/react";
import { auth, signIn } from "../../../../auth";
import NavElements from "./elements";
import ProfileDropdown from "./profileDropdown";

const Navbar = async () => {
    const user = (await auth())?.user;
    return (
        <section className="min-h-[80vh] flex w-[7rem] bg-softBg text-color justify-center items-center rounded-lg">
            <div className="absolute w-auto right-10 top-10">
                {user?.image ? (
                    <ProfileDropdown user={user} />
                ) : (
                    <form
                        action={async () => {
                            "use server";
                            await signIn("github");
                        }}>
                        <Button type="submit">Login</Button>
                    </form>
                )}
            </div>
            <NavElements />
        </section>
    );
};

export default Navbar;
