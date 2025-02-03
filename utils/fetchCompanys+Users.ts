// fetchCompanys+Users.ts

interface User {
  userID: string;
  name: string;
  checked_in: boolean;
  checkInTime?: string;
  email: string;
}

interface CompanyData {
  companyId: string;
  companyName: string;
  users: User[];
  email: string;
}

export const fetchCompanies = async (token: string): Promise<CompanyData> => {
  try {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });


    const data = await response.json();

    if (response.status === 404) {
      return {
          companyId: '',
          companyName: '',
          users: [],
          email: ''
      };
    }

    // Validate data structure and checked_in property
    if (data && data.companyId && data.companyName && Array.isArray(data.users)) {
      const validatedUsers = data.users.map((user: any) => ({
        ...user,
        checked_in: Boolean(user.checked_in)
      }));

      const validatedData = {
        ...data,
        users: validatedUsers
      };

      console.log('Validated company data:', validatedData);
      return validatedData;
    } 
    else {
      console.error('Fetched data is not in the expected format:', data);
      throw new Error('Fetched data does not contain the expected structure');
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};