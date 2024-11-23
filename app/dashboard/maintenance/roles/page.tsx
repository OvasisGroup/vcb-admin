// "use client"
import { authOptions } from "@/lib/auth";
import { Roles, columns } from "./columns"
import { DataTable } from "./data-table"
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PermissionsPage from "../permissions/page";


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
    <div className='p-6'>
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div><p className="font-light text-2xl  text-vcblue">Roles</p>
          <p className="font-light text-black">maintenance/roles</p>
        </div>
        {/*  */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Role &rarr;</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Role &rarr;</DialogTitle>
            </DialogHeader>
            <p>Form</p>
          </DialogContent>
        </Dialog>
      </div>
      <div className='p-6 bg-white rounded-xl'>
        <DataTable columns={columns} data={data} />
      </div>
    
      
        <PermissionsPage/>
      
      
    </div>
  )
}
