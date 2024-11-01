"use client";
import './sidebar.css';
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { Button } from "@nextui-org/button"; 
import { Link } from "@nextui-org/link";
import { auth } from '../libs/firebaseConfig'; 
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { ThemeSwitch } from '@/components/theme-switch';

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

export function NavbarComp() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); 
        });
        return () => unsubscribe(); 
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit text-lg">COMPANY NAME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link href="/dashboard" aria-current="page" className='text-lg'>
                        Checked In
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/dashboard/analytics" color="foreground" className='text-lg'>
                        Analytics
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/dashboard/settings" className='text-lg'>
                    Settings
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {isAuthenticated ? (
                    <Dropdown placement="bottom-end" className='text-lg'>
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="User Name"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" className='text-lg' >
                            <DropdownItem key="profile" className="h-14 gap-2" >
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button color='primary'>Login</Button>
                    
                    
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
