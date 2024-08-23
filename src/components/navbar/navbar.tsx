import { Button } from "@nextui-org/react";

import NavElements from "./navElements";
import ProfileDropdown from "./profileDropdown";
import { auth } from "../../../auth";

const Navbar = async () => {
    const user = (await auth())?.user;
    return (
        <section className="md:min-h-[80vh] h-auto flex w-[7.5rem] bg-softBg text-color justify-center items-center rounded-lg rounded-r-[50%]">
            <div className="absolute md:flex hidden w-auto top-10">
                <ProfileDropdown user={user || null} />

                {/* {user?.image ? (
                    <ProfileDropdown user={user} />
                ) : (
                    <form
                        action={async () => {
                            "use server";
                            await signIn("github");
                        }}>
                        <Button type="submit">Login</Button>
                    </form>
                )} */}
            </div>
            <NavElements />
        </section>
    );
};

export default Navbar;
