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

export type Corporate = {
  id: number;
  corpDraftId: number;
  name: string;
  description: string;
  status: string;
};

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? "Inactive" : "Active";
};

interface ColumnActionsProps {
  corpDraftId: number;
  onApprove: (corpDraftId: number) => Promise<void>;
  onReject: (corpDraftId: number) => Promise<void>;
}

const ColumnActions: React.FC<ColumnActionsProps> = ({
  corpDraftId,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onApprove(corpDraftId)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
      >
        <CheckCircleIcon className="h-4 w-4 mr-1" />
        Approve
      </Button>
      <Button
        onClick={() => onReject(corpDraftId)}
        className="bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        <XCircleIcon className="h-4 w-4 mr-1" />
        Reject
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Corporate>[] = [
  {
    accessorKey: "corpDraftId",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "corporate Name",
  },
  
  {
    accessorKey: "dateOfIncorporation",
    header: "Date of Incorporation",
  },

  {
    accessorKey: "numberOfUsers",
    header: "No. of Users",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const corporate = row.original;

      if (corporate.status !== "PENDING") {
        return null;
      }

      return (
        <ColumnActions
          corpDraftId={corporate.corpDraftId}
          onApprove={(table.options.meta as any)?.onApprove}
          onReject={(table.options.meta as any)?.onReject}
        />
      );
    },
  },
];
