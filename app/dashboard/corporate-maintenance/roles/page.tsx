// "use client"
import { authOptions } from "@/lib/auth";
import { Roles, columns } from "./columns";
import { DataTable } from "./data-table";
import { getServerSession } from "next-auth";
import { Permissions as CreateRolePermissions } from "./create-roles/columns";
import CreateRole from "./create-roles/create-roles";
import PermissionsPage from "../permissions/page";

async function getRoles(): Promise<Roles[]> {
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

async function getPermissions(): Promise<CreateRolePermissions[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_URL_API}/authentication/permissions/customer`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  console.log("Corporate admin permissions", data);

  return data.body;
}

export default async function RolesPage() {
  const rolesData = await getRoles();
  const permissionsData = await getPermissions();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">Roles</p>
          <p className="font-light text-black">corporate maintenance/roles</p>
        </div>

        <CreateRole permissionsData={permissionsData} />
      </div>
      <div className="p-6 bg-white rounded-xl">
        <DataTable columns={columns} data={rolesData} />
      </div>

      <PermissionsPage />
    </div>
  );
}
