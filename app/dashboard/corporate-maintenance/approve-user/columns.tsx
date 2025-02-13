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

export type RetailUsers = {
  id: number;
  signatoryDraftId: number;
  name: string;
  description: string;
  status: string;
};

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? "Inactive" : "Active";
};

interface ColumnActionsProps {
  signatoryDraftId: number;
  onApprove: (signatoryDraftId: number) => Promise<void>;
  onReject: (signatoryDraftId: number) => Promise<void>;
}

const ColumnActions: React.FC<ColumnActionsProps> = ({
  signatoryDraftId,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onApprove(signatoryDraftId)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
      >
        <CheckCircleIcon className="h-4 w-4 mr-1" />
        Approve
      </Button>
      <Button
        onClick={() => onReject(signatoryDraftId)}
        className="bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        <XCircleIcon className="h-4 w-4 mr-1" />
        Reject
      </Button>
    </div>
  );
};

export const columns: ColumnDef<RetailUsers>[] = [
  {
    accessorKey: "signatoryDraftId",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const retail = row.original;

      if (retail.status !== "PENDING") {
        return null;
      }

      return (
        <ColumnActions
          signatoryDraftId={retail.signatoryDraftId}
          onApprove={(table.options.meta as any)?.onApprove}
          onReject={(table.options.meta as any)?.onReject}
        />
      );
    },
  },
];
