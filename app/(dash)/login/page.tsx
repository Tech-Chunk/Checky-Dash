'use client';
import React from "react";
import {Input} from "@nextui-org/input";
import { useState } from 'react';
import { signUp, logIn } from '../../../libs/auth';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {Checkbox} from "@nextui-org/checkbox";
import {Button} from "@nextui-org/button"
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import { GoogleLogo } from "@/components/GoogleLogo";
import { toast, useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter()

    const [value, setValue] = React.useState("example.com");
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    
    const isInvalid = React.useMemo(() => {
      if (value === "") return false;
  
      return validateEmail(value) ? false : true;
    }, [value]);

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {

        if (isLogin) {
          const user = await logIn(email, password);
          toast({
            title: "Logged In",
          })
          router.push('/dashboard')
        } else {
          await signUp(email, password);
          toast({
            title: "Signed up",
          })        
          router.push('/dashboard')
        }
      } catch (error: any) {11
        alert(error.message);
      }
    };
    return (
        <div className="wrapper flex justify-center content-center items-center		">
          <Card className="p-2 w-1/3 flex justify-center align-middle ">
            <CardHeader>
              <h1 className="font-medium text-3xl">Login</h1>
            </CardHeader>
            <CardBody>

        <form onSubmit={handleSubmit} className="flex flex-col">
            
            <Input value={email} type="Email" label="Email" variant="bordered" isInvalid={isInvalid} errorMessage="bad emal" onValueChange={setValue} onChange={(e) => setEmail(e.target.value)} className="max-w"></Input>
            <Input value={password} type="Password" label="Password" variant="bordered" onChange={(e) => setPassword(e.target.value)} className="max-w"></Input>

            <div className="flex flex- justify-between pt-3">
              <Checkbox defaultSelected>Remember me</Checkbox>
            </div>
            <div className="flex flex-col gap-2 justify-between pt-4">
              <Button color="primary" type="submit" className="btn w-full" onClick={() => setIsLogin(isLogin)}>Login</Button>
              <Button  type="submit" className="btn w-full p-6" onClick={() => setIsLogin(isLogin)} startContent={<GoogleLogo/>}>Sign in with Google</Button>

            </div>
            <a href="#" className="text-center mt-5">Forgot Password?</a>
            

        </form>
        </CardBody>
        </Card>

   
    </div>
    )
}
