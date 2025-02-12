"use client";

import { useSession } from "next-auth/react";
import { Roles, columns } from "./columns";
import { DataTable } from "./data-table";

interface ApproveUserClientProps {
  initialRoles: Roles[];
}

export default function ApproveUserClient({
  initialRoles,
}: ApproveUserClientProps) {
    
    const { data: session } = useSession();

  const approveRole = async (draftId: number) => {
    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL_API}/authentication/role/${draftId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error approving role: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Role approved successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error approving role:", error);
      throw error;
    }
  };

  const rejectRole = async (draftId: number) => {
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
        throw new Error(`Error rejecting role: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Role rejected successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error rejecting role:", error);
      throw error;
    }
  };

  const handleApprove = async (draftId: number) => {
    try {
      await approveRole(draftId);
    } catch (error) {
      console.error("Approving role failed:", error);
    }
  };

  const handleReject = async (draftId: number) => {
    try {
      await rejectRole(draftId);
    } catch (error) {
      console.error("Rejecting role failed:", error);
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
