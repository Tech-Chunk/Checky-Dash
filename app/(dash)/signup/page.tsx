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
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const [value, setValue] = React.useState("junior2nextui.org");
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    

  


    const isInvalid = React.useMemo(() => {
      if (value === "") return false;
  
      return validateEmail(value) ? false : true;
    }, [value]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          if (isLogin) {
            await logIn(email, password);
            alert('Login successful!');
          } else {
            await signUp(email, password);
            alert('Sign up successful!');
          }
        } catch (error: any) {
          alert(error.message);
        }
      };
      


    return (
        <div className="wrapper flex justify-center content-center items-center		">
          <Card className="p-2 w-1/3 flex justify-center align-middle ">
            <CardHeader>
              <h1 className="font-medium text-3xl">Sign Up</h1>
            </CardHeader>
            <CardBody>

        <form onSubmit={handleSubmit} className="flex flex-col">
            
            <Input value={email} type="Email" label="Email" variant="bordered" isInvalid={isInvalid} isRequired errorMessage="Bad Email" onValueChange={setValue} onChange={(e) => setEmail(e.target.value)} className="max-w"></Input>
            <Input value={password} type="Password" label="Password" variant="bordered" isRequired onChange={(e) => setPassword(e.target.value)} className="max-w"></Input>

            <div className="flex flex- justify-between pt-3">
              <Checkbox defaultSelected>Remember me</Checkbox>
            </div>
            <div className="flex flex-col gap-2 justify-between pt-4">
              <Button color="primary" type="submit" className="btn w-full" onClick={() => setIsLogin(!isLogin)}>Sign Up</Button>
              <Button  type="submit" className="btn w-full p-6" onClick={()=> setIsLogin} startContent={<GoogleLogo/>}>Sign in with Google</Button>

            </div>
            <a href="#" className="text-center mt-5">Forgot Password?</a>
            

        </form>
        </CardBody>
        </Card>

   
    </div>
    )
}
