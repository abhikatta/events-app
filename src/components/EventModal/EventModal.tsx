"use client";
import { revalidate } from "@/actions/server-actions";
import {
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
    DateValue,
    RadioGroup,
    Radio,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import { useState } from "react";

const EventModal = ({
    event,
    isOpen,
    onOpenChange,
    date,
}: {
    event: Event | null;
    isOpen: boolean;
    onOpenChange: () => void;
    date: DateValue | null;
}) => {
    const [priority, setPriority] = useState<string | null>(null);
    const createEvent = async (formData: FormData) => {
        const title = formData?.get("title");
        const description = formData?.get("description");
        if (
            !title ||
            !description ||
            !priority ||
            title.toString().trim() === "" ||
            description.toString().trim() === "" ||
            priority === null
        ) {
            return null;
        }
        try {
            await fetch(`/api/events?date=${date}`, {
                method: event === null ? "POST" : "PATCH",
                body: JSON.stringify({
                    title: title,
                    description: description,
                    id: event?.id,
                    priority: priority,
                }),
            });

            revalidate("/events");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <form action={createEvent}>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    label="Title"
                                    name="title"
                                    labelPlacement="outside"
                                    defaultValue={event?.title || ""}
                                    variant="underlined"
                                />
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    name="description"
                                    label="Description"
                                    labelPlacement="outside"
                                    defaultValue={event?.description || ""}
                                    variant="underlined"
                                />
                                <RadioGroup
                                    className="mt-10"
                                    label="Select priority"
                                    defaultValue={event?.priority.toString()}
                                    onValueChange={(e) => setPriority(e)}>
                                    <Radio value="low">Low</Radio>
                                    <Radio value="medium">Medium</Radio>
                                    <Radio value="high">High</Radio>
                                    <p>Priority: {priority}</p>
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    variant="light"
                                    onPress={onClose}
                                    type="submit">
                                    Save
                                </Button>

                                <Button className="bg-softBg" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EventModal;
