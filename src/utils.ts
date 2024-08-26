import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const routeToHome = (date: string | null, router: AppRouterInstance) => {
    router.push(`/?date=${date}`);
};
