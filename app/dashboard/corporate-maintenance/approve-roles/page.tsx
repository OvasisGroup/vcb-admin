// "use client"
import { authOptions } from "@/lib/auth";
import { Roles } from "./columns";
import { getServerSession } from "next-auth";
import ApproveRolesClient from "./approve-roles";

async function getPendingRoles(): Promise<Roles[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_URL_API}/authentication/role/pending`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  console.log("Pending Corporate admin roles", data);
  return data.body;
}



export default async function RolesPage() {
  const rolesData = await getPendingRoles();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">Pending Roles</p>
          <p className="font-light text-black">Corporate maintenance roles</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
      <ApproveRolesClient initialRoles={rolesData} />
      </div>
    </div>
  );
}
