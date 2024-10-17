'use client'

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image"
import Sidebar from "@/components/Dashnavbar";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";

const list = [
  {
    title: "Grandpa",
    img: "/images/grandpa.jpg",
    price: "$5.50",
  },
  {
    title: "Grandma",
    img: "/images/grandma.jpg",
    price: "$3.00",
  },

]

export default function Home() {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-center align-middle">
      <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
        <CardHeader className="absolute z-10 top-1 flex-col !items-start gap-4">
          <h1 className="font-medium text-3xl">Checked In</h1>

          <Card className="w-[95%]">
          <CardBody className="flex flex-row gap-4 p-4 content-center items-center justify-center">
              <Avatar></Avatar>
              <div className="flex flex-col gap-0">
                <h1 className="text-xl">Person 1</h1>
                <p className="text-sm">employee</p>
              </div>
              <div className="ml-auto flex items-center">
                <h2 className="text-lg">9:15</h2>
              </div>
            </CardBody>
          </Card>

          <Card className="w-[95%]">
            <CardBody className="flex flex-row gap-4 p-4 content-center items-center justify-center">
              <Avatar></Avatar>
              <div className="flex flex-col gap-0">
                <h1 className="text-xl">Person 1</h1>
                <p className="text-sm">employee</p>
              </div>
              <div className="ml-auto flex items-center">
                <h2 className="text-lg">9:15</h2>
              </div>
            </CardBody>
          </Card>
        </CardHeader>
      </Card>
      <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h1 className="font-medium text-3xl">Recent Activity</h1>
        </CardHeader>
      </Card>
    </div>
  );
}
