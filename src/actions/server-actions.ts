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
    await signIn(singInMethod);
};

export const deleteEvent = async (event: Event) => {
    try {
        await fetch(`${API_BASE_URL}/events?date=${event.slug}`, {
            method: "DELETE",
            body: JSON.stringify({
                id: event.id,
            }),
        });
        revalidate("/events");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
