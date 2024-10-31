"use client";
import { useEffect, useState } from 'react';
import { fetchCompanies } from '@/utils/fetchCompanys+Users';
import { auth } from '@/libs/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';


interface User {
  id: string;
  name: string;
}

interface Company {
  companyId: string;
  companyName: string;
  users: User[];
}

export default function TestPage() {
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
    return <div>Loading...</div>;
  }

  if (!companies) {
    return <div>No companies found.</div>;
  }

  return (
    <div>
      <h1 className='font-bold text-xl'>User Companies</h1>
      <h2>{companies.companyName}</h2>
      <h1 className='font-bold text-xl'>Users in {companies.companyName}</h1>
      <ul>
        {companies.users.length > 0 ? (
          companies.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))
        ) : (
          <li>No users found for this company.</li>
        )}
      </ul>
    </div>
  );
}
