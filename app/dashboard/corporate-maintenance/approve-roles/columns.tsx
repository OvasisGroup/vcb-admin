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

export type Roles = {
  id: number;
  draftId: number;
  name: string;
  description: string;
  status: string;
};

export type CorpAdmin = {
  draftId: number,
  status: string,
  roleId: number,
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
  draftId: number;
  onApprove: (draftId: number) => Promise<void>;
  onReject: (draftId: number) => Promise<void>;
}

const ColumnActions: React.FC<ColumnActionsProps> = ({
  draftId,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onApprove(draftId)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
      >
        <CheckCircleIcon className="h-4 w-4 mr-1" />
        Approve
      </Button>
      <Button
        onClick={() => onReject(draftId)}
        className="bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        <XCircleIcon className="h-4 w-4 mr-1" />
        Reject
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Roles>[] = [
  {
    accessorKey: "draftId",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Role Name",
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
      const role = row.original;

      if (role.status !== "PENDING") {
        return null;
      }

      return (
        <ColumnActions
          draftId={role.draftId}
          onApprove={(table.options.meta as any)?.onApprove}
          onReject={(table.options.meta as any)?.onReject}
        />
      );
    },
  },
];
