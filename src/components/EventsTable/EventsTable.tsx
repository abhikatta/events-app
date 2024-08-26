"use client";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Dropdown,
    DropdownTrigger,
    Button,
    DropdownMenu,
    DropdownItem,
    Chip,
    ChipProps,
    SortDescriptor,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import { columns } from "./columnsData";
import { VerticalDotsIcon } from "../themeToggle/icons";
import { Key, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const EventsTable = ({ events }: { events: Event[] }) => {
    console.log("Server side eventstable: ", typeof window === "undefined");

    const router = useRouter();
    const searchParams = useMemo(() => new URLSearchParams(), []);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "priority",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return [...events].sort((a: Event, b: Event) => {
            const first = a[sortDescriptor.column as keyof Event] as string;
            const second = b[sortDescriptor.column as keyof Event] as string;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? cmp : -cmp;
        });
    }, [sortDescriptor, events]);

    const priorityColorMap: Record<string, ChipProps["color"]> = useMemo(
        () => ({
            low: "success",
            medium: "warning",
            high: "danger",
        }),
        []
    );

    const renderCell = useCallback(
        (columnKey: Key, data: Event) => {
            const cellValue = data[columnKey as keyof Event];
            console.log("cellvalue: ", cellValue, " columnKey: ", columnKey);

            switch (columnKey) {
                case "title":
                    return <TableCell>{data.title}</TableCell>;
                case "id":
                    return <TableCell>{data.id}</TableCell>;
                case "description":
                    return (
                        <TableCell>
                            {data.description.slice(0, 15)}
                            {data.description.length > 15 ? "..." : ""}
                        </TableCell>
                    );
                case "priority":
                    return (
                        <TableCell>
                            <Chip
                                color={priorityColorMap[data.priority]}
                                size="md"
                                className="text-center w-[100%]"
                                variant="flat">
                                {data.priority.slice(0, 1).toUpperCase() +
                                    data.priority.slice(1)}
                            </Chip>
                        </TableCell>
                    );
                case "slug":
                    return <TableCell>{data.slug}</TableCell>;
                case "actions":
                    return (
                        <TableCell>
                            <div className="relative flex justify-end items-center gap-2">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light">
                                            <VerticalDotsIcon className="text-default-300" />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>View</DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                searchParams.set(
                                                    "date",
                                                    data.slug
                                                );
                                                searchParams.set(
                                                    "item",
                                                    data.id
                                                );

                                                router.push(
                                                    `/?${searchParams.toString()}`
                                                );
                                            }}>
                                            Edit
                                        </DropdownItem>
                                        <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </TableCell>
                    );
                default:
                    return <TableCell>{cellValue.toString()}</TableCell>;
            }
        },
        [priorityColorMap, router, searchParams]
    );
    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            sortDescriptor={sortDescriptor}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => renderCell(columnKey, item)}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default EventsTable;
