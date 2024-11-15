"use client";
import React, { useEffect, useState } from "react";
import SettingsNav from "@/components/SettingsNavt";
import { Card, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { fetchCompanies } from "@/utils/fetchCompanys+Users";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { columns, users } from "./data";
import { Button } from "@nextui-org/button";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/modal";
import {Link} from "@nextui-org/link"
import { Input } from "@nextui-org/input";

const statusColorMap: { [key: string]: string } = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


type User = typeof users[0];

   

export default function Settings() {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  async function addUser() {
    const email = document.getElementById('email') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    
    
    const response = await fetch('/api/companies', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email.value,
          name: name.value
      })
  });
  }

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-row gap-10">
      <div className="w-1/6">
        <h1 className="text-3xl font-medium">Settings</h1>

        <Divider className="mt-2 mb-2"></Divider>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Users</h2>
          <h2 className="text-xl">Customization</h2>
          <h2 className="text-xl">Subscription</h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between flex-row">
        <h1 className="text-3xl mb-2">Users</h1>
          <Button size="lg" className="mb-4" onPress={onOpen}>Add user</Button>
          <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Employee</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  id="name"
                  label="Name"
                  placeholder="Enter Employee name"
                  variant="bordered"
                />
                <Input
                  id="email"
                  label="Email"
                  placeholder="Enter employee email"
                  variant="bordered"
                />
      
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => addUser()}>
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </div>

        <Table aria-label="Example table with custom cells" className="w-full">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell
                    className={
                      columnKey === "actions" ? "flex justify-center" : ""
                    }
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
   
      </div>
    </div>
  );
}


