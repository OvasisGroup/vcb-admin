import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import AddBankAdmin from '@/components/registration/AddBankAdmin'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Permissions, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from '@/components/ui/button';


async function getData(): Promise<Permissions[]> {

    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;
    const res = await fetch(`${process.env.NEXTAUTH_URL_API}/authentication/permissions/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`,
        },

    }); // Replace with your endpoint
    console.log("bank admin", res);
    const data = await res.json();
    // Ensure data matches your table structure
    return data;
}

export default async function PermissionsPage() {
    const data = await getData()
    return (
        <div className='p-0 mt-6'>
            <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
                <div><p className="font-light text-2xl  text-vcblue">Permissions</p>
                    <p className="font-light text-black">maintenance/permissions</p>
                </div>

            </div>

            <div>

            </div>
            <div className='p-6 bg-white rounded-xl'>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
