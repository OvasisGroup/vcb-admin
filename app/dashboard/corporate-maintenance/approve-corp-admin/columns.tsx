"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export type CorpAdmin = {
  adminDraftId: number,
  status: string,
  adminId: number,
  userId: string,
  adminName: string,
  email: string,
  employeeId: number,
  phoneNumber: string,
  createdBy: string,
}

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? "Inactive" : "Active";
};

interface ColumnActionsProps {
  adminDraftId: number;
  onApprove: (adminDraftId: number) => Promise<void>;
  onReject: (adminDraftId: number) => Promise<void>;
}

const ColumnActions: React.FC<ColumnActionsProps> = ({
  adminDraftId,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onApprove(adminDraftId)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
      >
        <CheckCircleIcon className="h-4 w-4 mr-1" />
        Approve
      </Button>
      <Button
        onClick={() => onReject(adminDraftId)}
        className="bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        <XCircleIcon className="h-4 w-4 mr-1" />
        Reject
      </Button>
    </div>
  );
};

export const columns: ColumnDef<CorpAdmin>[] = [
  {
    accessorKey: "adminDraftId",
    header: "ID",
  },

  {
    accessorKey: "userId",
    header: "User ID",
  },

  {
    accessorKey: "adminName",
    header: "Admin Name",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const admin = row.original;

      if (admin.status !== "PENDING") {
        return null;
      }

      return (
        <ColumnActions
          adminDraftId={admin.adminDraftId}
          onApprove={(table.options.meta as any)?.onApprove}
          onReject={(table.options.meta as any)?.onReject}
        />
      );
    },
  },
];
