"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [isOpen, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");

  //Note: this should really be in the session state - to be configured in [...nextauth] callbacks
  useEffect(() => {
    const getUserDetails = async () => {
      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      }).then(async (res) => {
        const { username, title } = await res.json();
        setUsername(username);
        setTitle(title);
      });
    };
    getUserDetails();
  }, [session]);

  const onClose = () => {
    setOpen(false);
  };

  const saveUserDetails = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email, username, title }),
      });
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          {!session ? (
            <Button onClick={async () => await signIn("google")}>
              <h3 className="text-xl font-semibold">Sign In</h3>
            </Button>
          ) : (
            <div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Hi {session.user?.name}! </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Tabs>
                      <TabList>
                        <Tab fontSize="xs">Username</Tab>
                        <Tab fontSize="xs">Title</Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel>
                          <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Set username here"
                            size="xs"
                          />
                        </TabPanel>
                        <TabPanel>
                          <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Set title here"
                            size="xs"
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={saveUserDetails} variant="ghost">
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <div>
                Username: {username}
                <br></br>
                Title: {title}
                <br></br>
                <>{JSON.stringify({ hello: 'you' })}</>
              </div>
              <Button onClick={async () => await signOut()}>
                <h3 className="text-xl">Sign Out</h3>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
