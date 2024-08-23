import { Event } from "@prisma/client";

const columns: {
    name: string;
    uid: string;
    sortable: boolean;
}[] = [
    { name: "ID", uid: "id", sortable: false },
    { name: "TITLE", uid: "title", sortable: false },
    { name: "DESCRIPTION", uid: "description", sortable: false },
    { name: "PRIORITY", uid: "priority", sortable: true },
    { name: "CREATED At", uid: "createdAt", sortable: true },
    { name: "DATE", uid: "slug", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: false },
];

const priorityOptions = [
    { name: "Low", uid: "low" },
    { name: "Medium", uid: "medium" },
    { name: "High", uid: "high" },
];

export { columns, priorityOptions };
