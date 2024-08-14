"use client";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { User } from "next-auth";
import { logout } from "@/actions/server-actions";
const ProfileDropdown = ({ user }: { user: User }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Logout
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to Logout?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onClick={async () => logout()}>
                                    Yes
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    No
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {user.image ? (
                <Dropdown>
                    <DropdownTrigger>
                        <Avatar
                            radius="md"
                            isBordered
                            as="button"
                            className="transition-transform"
                            src={user?.image}
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        disabledKeys={["name", "email"]}
                        aria-label="Profile Actions"
                        variant="flat">
                        <DropdownItem key={"name"} textValue="Username">
                            Username: {user?.name?.toString()}
                        </DropdownItem>
                        <DropdownItem
                            key={"email"}
                            color="primary"
                            textValue="Email">
                            Email: {user?.email?.toString()}
                        </DropdownItem>
                        <DropdownItem
                            className="bg-danger text-softBg"
                            color="danger"
                            textValue="Logout"
                            onPress={onOpen}>
                            <p>Logout</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <></>
            )}
        </>
    );
};

export default ProfileDropdown;
