import { fetchCompanies } from "@/utils/fetchCompanys+Users";

const columns = [
  {name: "NAME", uid: "name"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

let FormatedUsers: {
  id: string;
  name: string;
  status: string;
  email: string;
}[] = [

];

async function GetUsers(token: any) {
  const users = await fetchCompanies(token);
  console.log(users);

  FormatedUsers = users.users.map(user => ({
    id: user.userID,
    name: user.name,
    status: user.checked_in ? "checked in" : "out of office",
    email: user.email,
  }));

  return FormatedUsers;
}

export { columns, FormatedUsers, GetUsers };