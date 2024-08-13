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
import React from "react";
import { logout } from "@/app/actions/server-actions";
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
                                Are you sure you want to Logout?
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
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem>{user?.name}</DropdownItem>
                        <DropdownItem>{user?.email}</DropdownItem>
                        <DropdownItem>
                            <Button fullWidth color="danger" onPress={onOpen}>
                                Logout
                            </Button>
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
