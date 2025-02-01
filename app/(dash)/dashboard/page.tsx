"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Button, ButtonGroup } from "@heroui/button";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@heroui/modal";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/libs/firebaseConfig';
import { fetchCompanies } from '@/utils/fetchCompanys+Users';


interface User {
  id: string;
  name: string;
  checked_in: boolean; 
  checkInTime?: string; 
}
interface Company {
  companyId: string;
  companyName: string;
  users: User[];
}


export default function Home() {
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [companies, setCompanies] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const companyData = await fetchCompanies(token);
          console.log('Fetched company data:', companyData);
          setCompanies(companyData);
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      } else {
        console.error('No user is currently logged in');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center gap-10">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-center align-middle">
        <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
          <CardHeader className="absolute z-10 top-1 flex-col items-start! gap-4">
            <div className="flex flex-col">
              <h1 className="font-medium text-3xl">In Building</h1>
              <p className="text-medium">People currently checked in</p>
            </div>

            
            <Card className="w-[95%]" isPressable>
              <CardBody className="flex flex-row gap-4 p-4 content-center items-center">
              <div className="max-w-[300px] w-full flex items-center gap-3">
             <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>  
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>  
              </CardBody>
            </Card>
            <Card className="w-[95%]" isPressable>
              <CardBody className="flex flex-row gap-4 p-4 content-center items-center">
              <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>  
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
              </CardBody>
            </Card>
            <Card className="w-[95%]" isPressable>
              <CardBody className="flex flex-row gap-4 p-4 content-center items-center">
              <div className="max-w-[300px] w-full flex items-center gap-3">
             <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>  
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div> 
              </CardBody>
            </Card>
            <Card className="w-[95%]" isPressable>
              <CardBody className="flex flex-row gap-4 p-4 content-center items-center">
              <div className="max-w-[300px] w-full flex items-center gap-3">
             <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>  
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div> 
              </CardBody>
            </Card>
            <Card className="w-[95%]" isPressable>
              <CardBody className="flex flex-row gap-4 p-4 content-center items-center">
              <div className="max-w-[300px] w-full flex items-center gap-3">
             <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>  
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div> 
              </CardBody>
            </Card>
                
            
          </CardHeader>
        </Card>

        <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
          <CardHeader className="absolute z-10 top-1 flex-col items-start!">
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

 


  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-center align-middle">
        <Card className="w-full sm:w-1/2 p-4 overflow-y-auto" style={{ height: "66vh" }}>
          <CardHeader className="absolute z-10 top-1 flex-col items-start! gap-4">
            <div className="flex flex-col">
              <h1 className="font-medium text-3xl">In Building</h1>
              <p className="text-medium">People currently checked in</p>
            </div>

            {companies?.users?.length > 0 ? (
              companies.users
                .filter(user => user.checked_in)
                .map(user => (
                  <Card key={user.id} className="w-[95%]" isPressable>
                    <CardBody className="flex flex-row gap-4 p-4 content-center items-center">
                      <Avatar />
                      <div className="flex flex-col gap-0">
                        <h1 className="text-xl font-bold tracking-tight">
                          {user.name}
                        </h1>
                        <p className="text-sm font-medium">Employee</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <h2 className="text-xl font-semibold">{user.checkInTime}</h2>
                      </div>
                    </CardBody>
                  </Card>
                ))
            ) : (
              <p>No users currently checked in</p>
            )}
          </CardHeader>
        </Card>

        <Card className="w-full sm:w-1/2 p-4" style={{ height: "66vh" }}>
          <CardHeader className="absolute z-10 top-1 flex-col items-start!">
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
