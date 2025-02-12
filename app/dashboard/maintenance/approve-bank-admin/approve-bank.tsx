"use client";

import { useSession } from "next-auth/react";
import { BankAdmin, columns } from "./columns";
import { DataTable } from "./data-table";

interface ApproveBankAdminClientProps {
  initialRoles: BankAdmin[];
}

export default function ApproveBankAdminClient({
  initialRoles,
}: ApproveBankAdminClientProps) {
    
    const { data: session } = useSession();

  const approveBankAdmin = async (adminDraftId: number) => {
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
        throw new Error(`Error approving bank admin: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Bank admin approved successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error approving bank admin:", error);
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
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/reject/${adminDraftId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error rejecting bank admin: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Bank admin rejected successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error rejecting bank admin:", error);
      throw error;
    }
  };

  const handleApprove = async (adminDraftId: number) => {
    try {
      await approveBankAdmin(adminDraftId);
    } catch (error) {
      console.error("Approving bank admin failed:", error);
    }
  };

  const handleReject = async (adminDraftId: number) => {
    try {
      await rejectRole(adminDraftId);
    } catch (error) {
      console.error("Rejecting bank admin failed:", error);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={initialRoles}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
