import { fetchCompanies } from "@/utils/fetchCompanys+Users";

interface User {
  id: string;
  name: string;
  checked_in: boolean;
  email: string;
}

interface Company {
  companyId: string;
  companyName: string;
  users: User[];
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

let FormatedUsers: { id: string; name: string; status: string; email: string }[] = [
  {
    id: "1",
    name: "Tony Reichert",
    status: "checked in",
    email: "tony.reichert@example.com",
  },
];

async function GetUsers(token: string) {
  const companyData = await fetchCompanies(token);
  console.log(companyData);

  FormatedUsers = companyData.users.map((user: any) => ({
    id: user.id,
    name: user.name,
    status: user.checked_in ? "checked in" : "out of office",
    email: user.email,
  }));

  return FormatedUsers;
}

export { columns, FormatedUsers, GetUsers };