"use client";

import Welcome from "@/components/onboarding/welcome"
import { useEffect, useState } from "react"
import { fetchCompanies } from "@/utils/fetchCompanys+Users";
import { auth } from "@/libs/firebaseConfig";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

interface CompanyData {
    companyName: string;
    region: string;
    plan: 'free' | 'pro';
    createdAt: Date;
    ownerId: string;
}

export default function Onboarding() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string>('');
    const [companyData, setCompanyData] = useState<CompanyData>({
        companyName: '',
        region: '',
        plan: 'free',
        createdAt: new Date(),
        ownerId: ''
    });

    const handleCompanyDataChange = (field: keyof CompanyData, value: any) => {
        setCompanyData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitToFirebase = async () => {
        console.log('Submitting company data:', companyData); // Debug log
        try {
            if (!token) {
                console.error('No token available');
                return;
            }

            console.log('Starting submission with token:', token.substring(0, 10) + '...');
            const response = await fetch('/api/companies/createcompany', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    companyName: companyData.companyName,
                    region: companyData.region,
                    plan: companyData.plan
                })
            });

            const data = await response.json();
            console.log('Response:', response.status, data); // Debug log

            if (response.ok) {
                router.push('/dashboard');
            } else {
                console.error('Server error:', data.error);
            }
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (!user) {
                router.push('/login'); 
                return;
            }

            const token = await user.getIdToken();
            setToken(token);

            const company = await fetchCompanies(token);
            if (company?.companyId) {
                router.push('/dashboard');
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <Welcome 
            companyData={companyData}
            onDataChange={(field: string, value: any) => handleCompanyDataChange(field as keyof CompanyData, value)}
            onSubmit={handleSubmitToFirebase}
            token={token}  // Add this line
        />
    )
}