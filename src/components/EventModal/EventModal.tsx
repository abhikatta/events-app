import {
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
const EventModal = ({
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
                        <form>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    label="Title"
                                    labelPlacement="outside"
                                    defaultValue={event.title}
                                    variant="underlined"
                                />
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Description"
                                    labelPlacement="outside"
                                    defaultValue={event.description}
                                    variant="underlined"
                                />
                                <Input
                                    label="Title"
                                    labelPlacement="outside"
                                    defaultValue={event.slug}
                                    variant="underlined"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onClick={() => console.log("clicked yes")}>
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
