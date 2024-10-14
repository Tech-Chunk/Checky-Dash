'use client'

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image"
import Sidebar from "@/components/Sidebar";
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
    <div className="main">


        <Sidebar></Sidebar>


        <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>

    </div>

    
  );
}
