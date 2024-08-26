// this is a client component
import { revalidate } from "@/actions/server-actions";
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

const EventModal = ({
    event,
    isOpen,
    onOpenChange,
    date,
}: {
    event: Event | null;
    isOpen: boolean;
    onOpenChange: () => void;
    date: string | null;
}) => {
    console.log("Server side modal: ", typeof window === "undefined");
    const createEvent = async (formData: FormData) => {
        const title = formData?.get("title");
        const description = formData?.get("description");
        const priority = formData?.get("priority");
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
            return revalidate("/");
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
