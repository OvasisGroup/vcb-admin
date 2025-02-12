import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddBankAdmin from "@/components/registration/AddBankAdmin";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { CorpUsers, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

async function getData(): Promise<CorpUsers[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session?.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/corporate/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ); 

  

  const data = await res.json();
  console.log('corporates are :', data);
  
  
  return data.body;
}

export default async function CorpRegMin() {
  const data = await getData();

  
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <p className="my-5 text-vcblue text-l font-bold px-0">
          Recent Corporate Customers
        </p>
        <p>View All &rarr;</p>
      </div>
      <div></div>
      <div className="p-0 bg-white rounded-xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
