"use client";

import { useSession } from "next-auth/react";
import { RetailUsers, columns } from "./columns";
import { DataTable } from "./data-table";

interface ApproveUserClientProps {
  initialRoles: RetailUsers[];
}

export default function ApproveUserClient({
  initialRoles,
}: ApproveUserClientProps) {
  const { data: session } = useSession();

  const approveRetailUser = async (signatoryDraftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/customer/approve/${signatoryDraftId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error approving retail user: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Retail user approved successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error approving retail user:", error);
      throw error;
    }
  };

  const rejectRole = async (signatoryDraftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/authentication/role/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error rejecting retail user: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Retail user rejected successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error rejecting retail user:", error);
      throw error;
    }
  };

  const handleApprove = async (signatoryDraftId: number) => {
    try {
      await approveRetailUser(signatoryDraftId);
    } catch (error) {
      console.error("Approving retail user failed:", error);
    }
  };

  const handleReject = async (signatoryDraftId: number) => {
    try {
      await rejectRole(signatoryDraftId);
    } catch (error) {
      console.error("Rejecting retail user failed:", error);
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
