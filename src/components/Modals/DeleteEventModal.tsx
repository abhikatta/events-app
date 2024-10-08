"use client";
import { deleteEvent } from "@/actions/server-actions";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const DeleteEventModal = ({
    event,
    isOpen,
    onOpenChange,
}: {
    event: Event;
    isOpen: boolean;
    onOpenChange: () => void;
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Delete Event
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete the event
                                titled:
                                <br />
                                <strong className="text-xl">
                                    {event.title}
                                </strong>
                                <span> created for </span>
                                <strong className="text-lg">
                                    {event.slug}
                                </strong>
                                ?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <form
                                action={async () => {
                                    const success = await deleteEvent(event);
                                    if (success) {
                                        toast.success(
                                            `Event titled ${event.title} has been successfully deleted!`
                                        );
                                    } else {
                                        toast.error(
                                            "Something went wrong! Please try again later."
                                        );
                                    }
                                }}>
                                <Button
                                    color="danger"
                                    variant="light"
                                    type="submit"
                                    onClick={onClose}>
                                    Yes
                                </Button>
                            </form>

                            <Button color="primary" onPress={onClose}>
                                No
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteEventModal;
