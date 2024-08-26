"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../../auth";
import { BuiltInProviderType } from "next-auth/providers";
import { Event } from "@prisma/client";
import { API_BASE_URL } from "@/constants";

export const logout = async () => {
    await signOut();
};

export const revalidate = (path: string) => revalidatePath(path);

export const login = async (singInMethod: BuiltInProviderType) => {
    "use server";
    await signIn(singInMethod);
};

export const deleteEvent = async (date: string, id: Event["id"]) => {
    try {
        await fetch(`${API_BASE_URL}/events?date=${date.toString()}`, {
            method: "DELETE",
            body: JSON.stringify({
                id: id,
            }),
        });
        revalidate("/events");
    } catch (error) {
        console.error(error);
    }
};
