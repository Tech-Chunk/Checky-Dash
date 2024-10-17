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
    <div className="flex flex-row gap-4 ">
    <Card className="col-span-12 sm:col-span-4 h-[500px] w-[800px]">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <h1 className=" font-medium text-3xl">Checked In</h1>
      </CardHeader>
    </Card>
    <Card className="col-span-12 sm:col-span-4 h-[500px] w-[800px]">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <h1 className=" font-medium text-3xl">Recent Activity</h1>
      </CardHeader>
    </Card>

    <div className="gap-2 grid grid-cols-2 sm:grid-cols-8">

      

      {list.map((item, index) => (
        <div></div>
      ))}
    </div>

    </div>

    
  );
}
