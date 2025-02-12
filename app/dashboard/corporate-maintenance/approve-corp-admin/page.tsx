import { authOptions } from "@/lib/auth";
import { CorpAdmin } from "./columns";
import { getServerSession } from "next-auth";
import ApproveCorpAdminClient from "./approve-corp";

async function getPendingCorpAdmins(): Promise<CorpAdmin[]> {
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
  console.log("Pending Corporate admins", data);
  return data.body;
}

export default async function ApproveCorpAdminsPage() {
  const CorpAdminData = await getPendingCorpAdmins();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">Pending Corporate Admins</p>
          <p className="font-light text-black">Maintenance corporate admins</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
        <ApproveCorpAdminClient initialCorpAdmin={CorpAdminData} />
      </div>
    </div>
  );
}
