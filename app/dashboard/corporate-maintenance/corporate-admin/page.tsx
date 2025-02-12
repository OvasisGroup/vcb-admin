import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { BankAdmin, columns, Role } from "./columns";
import { DataTable } from "./data-table";
import AddCorporateAdmin from "@/components/registration/AddCorporateAdmin";

async function getData(): Promise<BankAdmin[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  console.log("corporate admins", data);
  return data.body;
}

async function getRoles(): Promise<Role[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_URL_API}/authentication/role/customer`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  console.log("Corporate admin roles", data);
  return data.body;
}

export default async function CorporateAdmins() {
  const data = await getData();
  const rolesData = await getRoles();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">Corporate Admin</p>
          <p className="font-light text-black">
            Corporate-maintenance/corporate-admin
          </p>
        </div>

        <AddCorporateAdmin rolesData={rolesData} />
      </div>

      <div></div>
      <div className="p-6 bg-white rounded-xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
