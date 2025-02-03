"use client";
import './sidebar.css';
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button"; 
import { Link } from "@heroui/link";
import { auth } from '../libs/firebaseConfig'; 
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { ThemeSwitch } from '@/components/theme-switch';
import { toast } from '@/hooks/use-toast';
import { fetchCompanies } from '@/utils/fetchCompanys+Users';


const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];

async function getCompanyName(token: string): Promise<string | undefined> {
    try {
      const companyData = await fetchCompanies(token);
      const companyName = companyData.companyName;
      console.log('Company Name:', companyName);
      return companyName;
    } catch (error) {
      console.error('Error getting company name:', error);
      return undefined;
    }
  }



export function NavbarComp() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [token, setToken] = useState<string>('');
    const [companyName, setCompanyName] = useState<string | undefined>(undefined);

    const router = useRouter()  
    const pathname = usePathname()


    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setIsAuthenticated(!!user); 
            setUserEmail(user?.email || null);
            const token = user ? await user.getIdToken() : '';
            setToken(token);

        });
        return () => unsubscribe(); 
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        toast
        router.push("/login")
        toast({
            title: "Signed out"
        })
    };



    getCompanyName(token).then(companyName => {
        if (companyName) {
            setCompanyName(companyName);
        } else {
          console.log('Failed to fetch company name.');
        }
      });
    

    const namepfp = userEmail?.charAt(0).toUpperCase();
    const isLinkActive = (href: string) => pathname === href

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"></NavbarMenuToggle>
                    <p className="font-bold text-inherit text-lg">{companyName || 'Company'}</p>
                <NavbarBrand>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem >
                    <Link href="/dashboard" aria-current="page" className='text-lg' color={isLinkActive('/dashboard') ? 'primary' : 'foreground'}  >
                        Checked In
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/dashboard/analytics" color={isLinkActive('/dashboard/analytics') ? 'primary' : 'foreground'} className='text-lg'>
                        Analytics
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color={isLinkActive('/dashboard/settings') ? 'primary' : 'foreground'} href="/dashboard/settings" className='text-lg'>
                    Settings
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {isAuthenticated ? (
                    <Dropdown placement="bottom-end" className='text-lg'>
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                name={namepfp}
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" className='text-lg' >
                            <DropdownItem key="profile" className="h-14 gap-2" >
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{userEmail}</p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Link href='/login'>
                    <Button color='primary'>Login</Button>
                    </Link>
                    
                )}
                <NavbarItem>
                    <ThemeSwitch className="ml-4" />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default NavbarComp;
function GetUsers() {
    throw new Error('Function not implemented.');
}

