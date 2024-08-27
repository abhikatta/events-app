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
    useDisclosure,
    Input,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import { SearchIcon, VerticalDotsIcon } from "../themeToggle/icons";
import { Key, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteEventModal from "../Modals/DeleteEventModal";
import Link from "next/link";
import { columns } from "@/constants";

const EventsTable = ({ events }: { events: Event[] }) => {
    const {
        isOpen: deleteModalIsOpen,
        onOpen: deleteModalOnOpen,
        onOpenChange: deleteModalOnOpenChange,
    } = useDisclosure();
    const router = useRouter();
    const searchParams = useMemo(() => new URLSearchParams(), []);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "priority",
        direction: "ascending",
    });
    const [filterValue, setFilterValue] = useState("");
    const [deleteEvent, setDeleteEvent] = useState<Event | null>(null);

    const filteredItems = useMemo(() => {
        let filteredEvents = [...events];
        if (Boolean(filterValue)) {
            filteredEvents = filteredEvents.filter((event) => {
                return event.title
                    .toLowerCase()
                    .includes(filterValue.toLowerCase());
            });
        }
        return filteredEvents;
    }, [filterValue, events]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a: Event, b: Event) => {
            const first = a[sortDescriptor.column as keyof Event] as string;
            const second = b[sortDescriptor.column as keyof Event] as string;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? cmp : -cmp;
        });
    }, [sortDescriptor, filteredItems]);

    const priorityColorMap: Record<string, ChipProps["color"]> = useMemo(
        () => ({
            low: "success",
            medium: "warning",
            high: "danger",
        }),
        []
    );

    const goToEvent = useCallback(
        (data: Event) => {
            searchParams.set("date", data.slug);
            searchParams.set("event", data.id);

            router.push(`/?${searchParams.toString()}`);
        },
        [router, searchParams]
    );

    const topContent = useMemo(() => {
        return (
            <Input
                isClearable
                className="w-full "
                placeholder="Search by name..."
                startContent={<SearchIcon />}
                onClear={() => setFilterValue("")}
                onValueChange={(e) => setFilterValue(e)}
            />
        );
    }, []);
    const renderCell = useCallback(
        (columnKey: Key, data: Event) => {
            const cellValue = data[columnKey as keyof Event];

            switch (columnKey) {
                case "titlasde":
                    return <TableCell>{data.title}</TableCell>;

                case "description":
                    return (
                        <TableCell>
                            <p>
                                {data.description.slice(0, 15)}
                                {data.description.length > 15 ? "..." : ""}
                            </p>
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
                                        <DropdownItem
                                            onClick={() => goToEvent(data)}>
                                            View/Edit
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                setDeleteEvent(data);
                                                deleteModalOnOpen();
                                            }}
                                            color="danger">
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </TableCell>
                    );
                default:
                    return <TableCell>{cellValue.toString()}</TableCell>;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [goToEvent, priorityColorMap]
    );
    return (
        <>
            {deleteEvent ? (
                <DeleteEventModal
                    isOpen={deleteModalIsOpen}
                    onOpenChange={deleteModalOnOpenChange}
                    event={deleteEvent}
                />
            ) : (
                <></>
            )}
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                sortDescriptor={sortDescriptor}
                topContentPlacement="outside"
                topContent={topContent}
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
                <TableBody
                    items={sortedItems}
                    emptyContent={
                        <Link href={"/"}>
                            <p>No events found! Create a new event?</p>
                        </Link>
                    }>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => renderCell(columnKey, item)}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default EventsTable;
