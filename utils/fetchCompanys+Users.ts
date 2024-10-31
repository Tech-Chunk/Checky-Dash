// fetchCompanys+Users.ts
export const fetchCompanies = async (token: string): Promise<{ companyId: string; companyName: string; users: any[] }> => {
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
    console.log('Companies data fetched:', data); // Log the response data

    if (data && data.companyId && data.companyName && Array.isArray(data.users)) {
      return data; // Return the entire object with company and users
    } else {
      console.error('Fetched data is not in the expected format:', data); // Log unexpected data
      throw new Error('Fetched data does not contain the expected structure');
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error; // Rethrow to handle it where the function is called
  }
};
