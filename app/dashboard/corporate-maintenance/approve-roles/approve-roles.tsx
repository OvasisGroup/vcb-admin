"use client";

import { useSession } from "next-auth/react";
import { Roles, columns } from "./columns";
import { DataTable } from "./data-table";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ApproveRolesClientProps {
  initialRoles: Roles[];
}

export default function ApproveRolesClient({
  initialRoles,
}: ApproveRolesClientProps) {
  const { data: session } = useSession();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const rejectRole = async (draftId: number, reason: string) => {
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
          body: JSON.stringify({
            draftId,
            reason,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error rejecting role");
      }

      const data = await response.json();

      console.log("Role rejected successfully:", {
        apiResponse: data,
      });

      return data;
    } catch (error) {
      console.error("Error rejecting role:", error);
      console.log("Error rejecting role:", error);
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
    setSelectedDraftId(draftId);
    setIsRejectDialogOpen(true);
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDraftId || !rejectReason.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await rejectRole(selectedDraftId, rejectReason);

      setIsRejectDialogOpen(false);
      setRejectReason("");
      setSelectedDraftId(null);
    } catch (error) {
      console.error("Rejecting role failed:", error);
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={initialRoles}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Role</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleRejectSubmit}
            className="bg-white rounded-xl px-4 space-y-4 mt-4"
          >
            <div className="py-4">
              <textarea
                name=""
                id=""
                placeholder="Enter reason for rejection"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full p-4"
              ></textarea>
              {/* <Textarea
              placeholder="Enter reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full"
            /> */}
            </div>

           

            {error && <div className="text-red-600">{error}</div>}
            <Button type="submit" disabled={!rejectReason.trim() || isSubmitting}>
              {isSubmitting ? "Rejecting..." : "Reject Role"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
