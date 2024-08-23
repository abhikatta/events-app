"use client";
import { login, logout } from "@/actions/server-actions";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { User } from "next-auth";

const ProfileDropdown = ({ user }: { user: User | null }) => {
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
                                    onClick={() => {
                                        logout();
                                        onClose();
                                    }}>
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
            {user && user.image ? (
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
                <Dropdown>
                    <DropdownTrigger>
                        <Avatar
                            radius="md"
                            isBordered
                            as="button"
                            className="transition-transform"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                            startContent={
                                <Image
                                    width={30}
                                    alt="Github login"
                                    src="data:image/png;base64,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"
                                />
                            }
                            color="primary"
                            textValue="Github Login">
                            <form action={() => login("github")}>
                                <Button type="submit">Login with Github</Button>
                            </form>
                        </DropdownItem>
                        <DropdownItem
                            startContent={
                                <Image
                                    alt="Google login"
                                    width={30}
                                    src="data:image/png;base64,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"
                                />
                            }
                            color="primary"
                            textValue="Google Login">
                            <form action={() => login("google")}>
                                <Button type="submit">Login with Google</Button>
                            </form>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </>
    );
};

export default ProfileDropdown;
