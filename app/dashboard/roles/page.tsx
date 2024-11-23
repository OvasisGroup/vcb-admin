// "use client"
import { authOptions } from "@/lib/auth";
import { Roles, columns } from "./columns"
import { DataTable } from "./data-table"
import { getServerSession } from "next-auth";
import Link from "next/link";


async function getData(): Promise<Roles[]> {

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(`${process.env.NEXTAUTH_URL_API}/authentication/role/getAllRoles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`,
    },

  }); // Replace with your endpoint
  const data = await res.json();
// Ensure data matches your table structure
  return data.body;
}

export default async function RolesPage() {
  
  const data = await getData()

  return (
    <div className='p-0'>
    <div className='flex justify-between items-center'>
      <p className="my-5 text-vcblue text-2xl font-light px-0">Recent Corporate Users</p>
     <Link href="">
      <p className='text-vcbgold font-bold text-sm cursor-pointer'>VIEW ALL &rarr;</p>
     </Link> 
    </div>
    <div className='p-0 bg-white rounded-xl'>
      <DataTable columns={columns} data={data} />
    </div>
  </div>
  )
}
