import { authOptions } from "@/lib/auth";
import { RetailUsers, columns } from "./columns";
import { getServerSession } from "next-auth";
import ApproveUserClient from "./approve-user";

async function getRoles(): Promise<RetailUsers[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/pending`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  console.log("Pending retail users", data);
  return data.body;
}

export default async function RolesPage() {
  const rolesData = await getRoles();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">Pending Retail user</p>
          <p className="font-light text-black">Maintenance Retail User</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
      <ApproveUserClient initialRoles={rolesData} />
      </div>
    </div>
  );
}
