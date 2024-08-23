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
import { columns } from "./data";
import { VerticalDotsIcon } from "../themeToggle/icons";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const EventsTable = ({ events }: { events: Event[] }) => {
    const router = useRouter();
    const searchParams = new URLSearchParams();
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

    const priorityColorMap: Record<string, ChipProps["color"]> = {
        low: "success",
        medium: "warning",
        high: "danger",
    };

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
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                            <Chip
                                color={priorityColorMap[item.priority]}
                                size="md"
                                className="text-center w-[100%]"
                                variant="flat">
                                {item.priority.slice(0, 1).toUpperCase() +
                                    item.priority.slice(1)}
                            </Chip>
                        </TableCell>
                        <TableCell>{item.createdAt.toString()}</TableCell>
                        <TableCell>{item.slug}</TableCell>
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
                                                    item.slug
                                                );
                                                searchParams.set(
                                                    "item",
                                                    item.id
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
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default EventsTable;
