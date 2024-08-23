import { API_BASE_URL } from "@/constants";
import {
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
    DateValue,
} from "@nextui-org/react";
import { Event } from "@prisma/client";

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
    const createEvent = async (formData: FormData) => {
        const title = formData?.get("title");
        const description = formData?.get("description");
        await fetch(`/api/events?date=${date}`, {
            method: event === null ? "POST" : "PATCH",
            body: JSON.stringify({
                title: title,
                description: description,
                id: event?.id,
                priority: "medium",
            }),
        });
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
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    variant="light"
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
