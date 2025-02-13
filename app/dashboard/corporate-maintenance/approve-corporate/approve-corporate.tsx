"use client";

import { useSession } from "next-auth/react";
import { Corporate, columns } from "./columns";
import { DataTable } from "./data-table";

interface ApproveCorporateClientProps {
  initialCorporate: Corporate[];
}

export default function ApproveCorporateClient({
  initialCorporate,
}: ApproveCorporateClientProps) {
  const { data: session } = useSession();

  const approveCorp = async (corpDraftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/corporate/approve/${corpDraftId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error approving corporate: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Corporate approved successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error approving corporate:", error);
      throw error;
    }
  };

  const rejectCorporate = async (corpDraftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/role/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error rejecting corporate: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Corporate rejected successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error rejecting corporate:", error);
      throw error;
    }
  };

  const handleApprove = async (corpDraftId: number) => {
    try {
      await approveCorp(corpDraftId);
    } catch (error) {
      console.error("Approving corporative failed:", error);
    }
  };

  const handleReject = async (corpDraftId: number) => {
    try {
      await rejectCorporate(corpDraftId);
    } catch (error) {
      console.error("Rejecting corporative failed:", error);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={initialCorporate}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
