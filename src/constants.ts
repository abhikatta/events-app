export const API_BASE_URL = `${process.env.NEXTAUTH_URL}/api`;
export const columns: {
    name: string;
    uid: string;
    sortable: boolean;
}[] = [
    { name: "TITLE", uid: "title", sortable: true },
    { name: "DESCRIPTION", uid: "description", sortable: false },
    { name: "PRIORITY", uid: "priority", sortable: true },
    { name: "DATE", uid: "slug", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: false },
];
