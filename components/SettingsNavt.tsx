"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, ButtonGroup } from "@heroui/button";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@heroui/modal";
import { Link } from "@heroui/link";

export default function SettingsNav() {
    return (
    <div className="flex">
        <Card className="flex">
            <CardHeader className="flex flex-col gap-5 p-5 pl-5 pr-5 pb-10">
            <h1 className="text-4xl font-semibold">Settings</h1>
                <div className="flex flex-col gap-2 w-full">
                <Link href="/dashboard/settings">
                    <Card isPressable className="w-full">
                        <CardHeader>Employees</CardHeader>
                    </Card>
                    </Link>
                    <Link href="/dashboard/settings/branding">
                    <Card isPressable className="w-full">
                        <CardHeader>Branding</CardHeader>
                    </Card>
                    </Link>
                    </div>
            </CardHeader>
        </Card>
    </div>
    )
}


