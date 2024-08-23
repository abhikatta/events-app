// "use client";
// import {
//     Table,
//     TableHeader,
//     TableColumn,
//     TableBody,
//     TableRow,
//     TableCell,
//     Dropdown,
//     DropdownTrigger,
//     Button,
//     DropdownMenu,
//     DropdownItem,
//     Chip,
//     ChipProps,
// } from "@nextui-org/react";
// import { Event } from "@prisma/client";
// import { columns } from "./data";
// import { useCallback } from "react";
// import { VerticalDotsIcon } from "../themeToggle/icons";

// const EventsTable = ({ events }: { events: Event[] }) => {
//     const priorityColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };
// //     const renderCell = useCallback((user: User, columnKey: React.Key) => {
// //     const cellValue = user[columnKey as keyof User];

// //     switch (columnKey) {
// //       case "name":
// //         return (
// //           <User
// //             avatarProps={{radius: "lg", src: user.avatar}}
// //             description={user.email}
// //             name={cellValue}
// //           >
// //             {user.email}
// //           </User>
// //         );
// //       case "role":
// //         return (
// //           <div className="flex flex-col">
// //             <p className="text-bold text-small capitalize">{cellValue}</p>
// //             <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
// //           </div>
// //         );
// //       case "status":
// //         return (
// //           <Chip className="capitalize" color={priorityColorMap[user.status]} size="sm" variant="flat">
// //             {cellValue}
// //           </Chip>
// //         );
// //       case "actions":
// //         return (
// //           <div className="relative flex justify-end items-center gap-2">
// //             <Dropdown>
// //               <DropdownTrigger>
// //                 <Button isIconOnly size="sm" variant="light">
// //                   <VerticalDotsIcon className="text-default-300" />
// //                 </Button>
// //               </DropdownTrigger>
// //               <DropdownMenu>
// //                 <DropdownItem>View</DropdownItem>
// //                 <DropdownItem>Edit</DropdownItem>
// //                 <DropdownItem>Delete</DropdownItem>
// //               </DropdownMenu>
// //             </Dropdown>
// //           </div>
// //         );
// //       default:
// //         return cellValue;
// //     }
// //   }, []);

//     return (
//         <Table
//             aria-label="Example table with custom cells, pagination and sorting"
//             isHeaderSticky
//             bottomContentPlacement="outside"
//             classNames={{
//                 wrapper: "max-h-[382px]",
//             }}
//             topContentPlacement="outside">
//             <TableHeader columns={columns}>
//                 {(column) => (
//                     <TableColumn
//                         key={column.uid}
//                         align={column.uid === "actions" ? "center" : "start"}
//                         allowsSorting={column.sortable}>
//                         {column.name}
//                     </TableColumn>
//                 )}
//             </TableHeader>
//             <TableBody items={events}>
//                 {(item) => (
//                     <TableRow key={item.id}>
//                         {(columnKey) => <TableCell>{renderCell({item.title})}</TableCell>}
//                     </TableRow>
//                 )}
//             </TableBody>
//         </Table>
//     );
// };

// export default EventsTable;
