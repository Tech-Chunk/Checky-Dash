"use client"
import React from "react";
import SettingsNav from "@/components/SettingsNavt"
import { Card, CardHeader } from "@nextui-org/card"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";

const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  
  const columns = [
    {
      key: "name",
      label: "NAME",
    },

    {
      key: "status",
      label: "STATUS",
    },
  ];

export default function Settings() {
    const [selectedColor, setSelectedColor] = React.useState("default");

  return (
    <div className="flex flex-row gap-5">
      <SettingsNav />
      <div className="w-full">
        <Card>
          <CardHeader className="flex flex-col gap-2 items-start">
            <h1 className="text-2xl font-semibold">Employees</h1>
            <Table aria-label="Example table with dynamic content" color="primary" selectionMode="multiple" defaultSelectedKeys={["1"]}>
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}