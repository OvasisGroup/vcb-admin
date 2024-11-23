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
import { CorpUsers, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from '@/components/ui/button';
import CorporateCustomerRegistration from '@/components/registration/CorporateCustomerRegistration';


async function getData(): Promise<CorpUsers[]> {

    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;
    const res = await fetch(`${process.env.NEXTAUTH_URL_API}/admin/corporate/all`, {
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

export default async function UserRegistration() {
    const data = await getData()
    return (
        <div className='p-6 mt-6'>
            <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
                <div><p className="font-light text-2xl  text-vcblue">Corporate Registration</p>
                    <p className="font-light text-black">maintenance/corporate-registration</p>
                </div>
                {/*  */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>Add Customer</Button>

                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Fill in the details to Create Customer</SheetTitle>

                            <AddBankAdmin />

                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <div>

            </div>
            <div className='p-6 bg-white rounded-xl'>
                <DataTable columns={columns} data={data} />
            </div>
            <CorporateCustomerRegistration/>
        </div>
    )
}
