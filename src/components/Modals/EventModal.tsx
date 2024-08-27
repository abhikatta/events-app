"use client";
import { revalidate } from "@/actions/server-actions";
import { routeToHome } from "@/utils";
import {
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
    RadioGroup,
    Radio,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const EventModal = ({
    event,
    isOpen,
    onOpenChange,
    date,
    eventId,
}: {
    event: Event | null;
    isOpen: boolean;
    onOpenChange: () => void;
    date: string | null;
    eventId: string | null;
}) => {
    useEffect(() => {
        if (eventId) {
            onOpenChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const router = useRouter();

    const createEvent = async (formData: FormData) => {
        const title = formData?.get("title");
        const description = formData?.get("description");
        const priority = formData?.get("priority");
        if (
            title?.toString().trim() === "" ||
            description?.toString().trim() === "" ||
            priority?.toString().trim() === ""
        ) {
            toast.error(`Please fill try again.`);
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
            revalidate("/");
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={true}
            onClose={() => {
                routeToHome(date, router);
            }}
            isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <form
                            action={async (e) => {
                                const success = await createEvent(e);
                                if (success) {
                                    toast.success(
                                        `Successfully created event ${e.get(
                                            "title"
                                        )}`
                                    );
                                } else {
                                    toast.error(
                                        `Could not create event! Please try again.`
                                    );
                                }
                            }}>
                            <ModalHeader>
                                <Input
                                    label="Title"
                                    name="title"
                                    labelPlacement="outside"
                                    defaultValue={event?.title}
                                    variant="underlined"
                                />
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    name="description"
                                    label="Description"
                                    labelPlacement="outside"
                                    defaultValue={event?.description}
                                    variant="underlined"
                                />
                                <RadioGroup
                                    className="mt-10"
                                    name="priority"
                                    label="Priority"
                                    defaultValue={event?.priority.toString()}>
                                    <Radio value="low">Low</Radio>
                                    <Radio value="medium">Medium</Radio>
                                    <Radio value="high">High</Radio>
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    variant="light"
                                    onPress={onClose}
                                    type="submit">
                                    {eventId ? "Save" : "Create event"}
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
