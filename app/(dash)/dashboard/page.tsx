"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import Sidebar from "@/components/Dashnavbar";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";

export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-center align-middle">
        <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
          <CardHeader className="absolute z-10 top-1 flex-col !items-start gap-4">
            <div className="flex flex-col">
              <h1 className="font-medium text-3xl">In Building</h1>
              <p className="text-medium">People currently checked in</p>
            </div>
            <Card className="w-[95%]" isPressable>
              <CardBody className="flex flex-row gap-4 p-4 content-center items-center justify-center">
                <Avatar></Avatar>
                <div className="flex flex-col gap-0">
                  <h1 className="text-xl font-bold tracking-tight	">
                    Charlie Fox
                  </h1>
                  <p className="text-sm -mt-1 font-medium">Employee</p>
                </div>
                <div className="ml-auto flex items-center">
                  <h2 className="text-xl font-semibold">9:15</h2>
                </div>
              </CardBody>
            </Card>
          </CardHeader>
        </Card>

        <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <div className="flex flex-col">
              <h1 className="font-medium text-3xl">Recent Activity</h1>
              <p className="text-medium">Recent Check-ins / Check-outs</p>
            </div>
          </CardHeader>
        </Card>
      </div>

      <ButtonGroup>
        <Button onPress={onOpen} color="primary">
          Download Fire Report
        </Button>
      </ButtonGroup>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Download Fire Report</ModalHeader>
            <ModalBody>
              {
                <h1>Would you like to download the fire report?</h1>
              }
            </ModalBody>
            <ModalFooter>
            <Button onPress={onClose}>Cancel</Button>

              <Button onPress={onClose} color="primary">Confirm</Button>

            </ModalFooter>
          </>
        )}
      </ModalContent>


      </Modal>
    </div>
  );
}
