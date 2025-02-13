// "use client"
import { authOptions } from "@/lib/auth";
import { Corporate,} from "./columns";
import { getServerSession } from "next-auth";
import ApproveCorporateClient from "./approve-corporate";

async function getCorporates(): Promise<Corporate[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found.");
  }
  const accessToken = session.user.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/corporate/pending-changes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  console.log("Pending Corporates", data);
  return data.body;
}



export default async function ApproveCorporatePage() {
  const corpData = await getCorporates();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">Pending Corporates</p>
          <p className="font-light text-black">Maintenance corporates</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
      <ApproveCorporateClient initialCorporate={corpData} />
      </div>
    </div>
  );
}
