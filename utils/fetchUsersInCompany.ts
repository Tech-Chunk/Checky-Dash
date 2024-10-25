import { auth } from '@/libs/firebaseConfig';

export const fetchCompanyUsers = async (companyId: string, token: string): Promise<any[]> => {
  const response = await fetch(`/api/companies/${companyId}/users`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch company users');
  }

  return response.json();
};