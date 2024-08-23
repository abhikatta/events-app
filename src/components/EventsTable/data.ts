const columns: {
    name: string;
    uid: string;
    sortable: boolean;
}[] = [
    { name: "ID", uid: "id", sortable: false },
    { name: "TITLE", uid: "title", sortable: true },
    { name: "DESCRIPTION", uid: "description", sortable: false },
    { name: "PRIORITY", uid: "priority", sortable: true },
    { name: "CREATED AT", uid: "createdAt", sortable: true },
    { name: "DATE", uid: "slug", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: false },
];

const priorityOptions = [
    { name: "Low", uid: "low" },
    { name: "Medium", uid: "medium" },
    { name: "High", uid: "high" },
];

export { columns, priorityOptions };
