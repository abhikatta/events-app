"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../../auth";
import { BuiltInProviderType } from "next-auth/providers";
import { Event } from "@prisma/client";
import { DateValue } from "@nextui-org/react";

export const logout = async () => {
    await signOut();
};

export const revalidate = (path: string) => revalidatePath(path);

export const login = async (singInMethod: BuiltInProviderType) => {
    "use server";
    await signIn(singInMethod);
};

export const deleteEvent = async (date: DateValue, id: Event["id"]) => {
    return await fetch(`/api/events/${date}`, {
        method: "DELETE",
        body: JSON.stringify({
            id: id,
            priority: "medium",
        }),
    });
};
