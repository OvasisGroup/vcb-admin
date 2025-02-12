"use client";

import { useSession } from "next-auth/react";
import { CorpAdmin, columns } from "./columns";
import { DataTable } from "./data-table";

interface ApproveCorpAdminClientProps {
  initialCorpAdmin: CorpAdmin[];
}

export default function ApproveCorpAdminClient({
  initialCorpAdmin,
}: ApproveCorpAdminClientProps) {
    
    const { data: session } = useSession();

  const approveRole = async (adminDraftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/approve/${adminDraftId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error approving corporate admin: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Corporate admin approved successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error approving corporate admin:", error);
      throw error;
    }
  };

  const rejectRole = async (adminDraftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL_API}/authentication/role/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error rejecting corporate admin: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Corporate admin rejected successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error rejecting role:", error);
      throw error;
    }
  };

  const handleApprove = async (adminDraftId: number) => {
    try {
      await approveRole(adminDraftId);
    } catch (error) {
      console.error("Approving corporate admin failed:", error);
    }
  };

  const handleReject = async (adminDraftId: number) => {
    try {
      await rejectRole(adminDraftId);
    } catch (error) {
      console.error("Rejecting corporate admin failed:", error);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={initialCorpAdmin}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
