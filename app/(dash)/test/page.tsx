"use client"
import { useEffect, useState } from 'react';
import { fetchCompanies } from '@/utils/fetchCompanys';
import { fetchCompanyUsers } from '@/utils/fetchUsersInCompany';
import { auth } from '@/libs/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface Company {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

export default function TestPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const companiesData = await fetchCompanies(token);
          console.log('Fetched companies:', companiesData);
          setCompanies(companiesData);
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

  const getUsers = async (companyId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const usersData = await fetchCompanyUsers(companyId, token);
        console.log('Fetched users for company', companyId, ':', usersData);
        setUsers(usersData);
      } else {
        console.error('No user is currently logged in');
      }
    } catch (error) {
      console.error('Error fetching company users:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='font-bold'>User Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id} onClick={() => getUsers(company.id)}>
            {company.name}
          </li>
        ))}
      </ul>
      <h2>Company Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}