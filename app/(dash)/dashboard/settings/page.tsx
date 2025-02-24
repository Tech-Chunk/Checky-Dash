"use client";
import React, { useEffect, useState } from "react";
import SettingsNav from "@/components/SettingsNavt";
import { Card, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Skeleton } from "@heroui/skeleton";
import { fetchCompanies } from "@/utils/fetchCompanys+Users";
import { User as UserComponent } from "@heroui/user";
import { Tooltip } from "@heroui/tooltip";
import { Chip } from "@heroui/chip";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { columns, FormatedUsers, GetUsers} from "./data";
import { Button } from "@heroui/button";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@heroui/modal";
import {Link} from "@heroui/link"
import { Input } from "@heroui/input";
import { auth } from '../../../../libs/firebaseConfig'; 
import { useToast } from "@/hooks/use-toast"
import { Pagination } from "@heroui/pagination";

const statusColorMap: { [key: string]: string } = {
  active: "success",
  paused: "danger",
  vacation: "warning",
  checkedIn: "primary",
  checkedOut: "secondary",
};

// Define a user data interface for our table rows
interface UserData {
  avatar?: string;
  email: string;
  team?: string;
  checkedIn?: boolean;
}

export default function Settings() {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [formatedUsers, setFormatedUsers] = useState(FormatedUsers);
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);
  const closeModal = () => setVisible(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedUsers = formatedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      const token = user ? await user.getIdToken() : '';
      setToken(token);
      
      const users = await GetUsers(token);
      setFormatedUsers(users);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  
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
    if (response.status === 201) {
      onClose();
      toast({
        title: "User added",
        description: "The user has been successfully added.",
      });
      const users = await GetUsers(token);
      setFormatedUsers(users);
    } 
  }

  const renderCell = React.useCallback((user: UserData, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserData];

    switch (columnKey) {
      case "name":
        return (
          <UserComponent
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </UserComponent>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        const statusColor = user.checkedIn ? "success" : "default";
        return (
          <Chip className="capitalize" size="sm" variant="flat" color={statusColor}>
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
                <Button color="primary" onPress={() => { addUser(); onClose(); }}>
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
          {loading ? (
            <TableBody>
              {Array.from({ length: itemsPerPage }).map((_, idx) => (
                <TableRow key={idx}>
                  {columns.map((column) => (
                    <TableCell key={column.uid}>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody items={paginatedUsers}>
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
          )}
        </Table>
        <Pagination
          total={Math.ceil(formatedUsers.length / itemsPerPage)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
          className="mt-4 self-center"
        />
   
      </div>
    </div>
  );
}


