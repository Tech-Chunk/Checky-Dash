"use client";

import { auth } from '@/libs/firebaseConfig';
import { fetchCompanies } from '@/utils/fetchCompanys+Users';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (!user) {
                router.push('/login'); 
                return;
            }

            const token = await user.getIdToken();
            setToken(token);

            const company = await fetchCompanies(token);
            if (company.companyId == "") {
                router.push('/onboarding');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <div>
            {children}
        </div>
    );
}
