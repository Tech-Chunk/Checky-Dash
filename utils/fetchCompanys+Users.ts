// fetchCompanys+Users.ts

interface User {
  userID: string;
  name: string;
  checked_in: boolean;
  checkInTime?: string;
}

interface CompanyData {
  companyId: string;
  companyName: string;
  users: User[];
}

export const fetchCompanies = async (token: string): Promise<CompanyData> => {
  try {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch companies: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Companies data fetched:', data);

    // Validate data structure and checked_in property
    if (data && data.companyId && data.companyName && Array.isArray(data.users)) {
      const validatedUsers = data.users.map(user => ({
        ...user,
        checked_in: Boolean(user.checked_in) // Ensure boolean type
      }));

      const validatedData = {
        ...data,
        users: validatedUsers
      };

      console.log('Validated company data:', validatedData);
      return validatedData;
    } else {
      console.error('Fetched data is not in the expected format:', data);
      throw new Error('Fetched data does not contain the expected structure');
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};