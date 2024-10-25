import { auth } from '@/libs/firebaseConfig';

export const fetchCompanies = async (token: string): Promise<any[]> => {
  const response = await fetch('/api/companies', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }

  return response.json();
};