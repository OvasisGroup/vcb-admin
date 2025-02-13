import React from "react";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { CorpUsers, columns } from "./columns";
import { DataTable } from "./data-table";
import CorporateCustomerRegistration from "../../../../components/registration/CorporateCustomerRegistration";

async function getData(): Promise<CorpUsers[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
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

  if (!data || !data.body || !Array.isArray(data.body)) {
    return [];
  }
  return data.body;
}

export default async function UserRegistration() {
  const data = await getData();
  return (
    <div className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">
            Corporate Registration
          </p>
          <p className="font-light text-black">
            maintenance/corporate-registration
          </p>
        </div>
      </div>

      <div></div>
      <div className="p-6 bg-white rounded-xl">
        <DataTable columns={columns} data={data} />
      </div>
      <CorporateCustomerRegistration />
    </div>
  );
}
