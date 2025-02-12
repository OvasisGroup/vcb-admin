"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"


export type BankAdmin = {
  roleId: number,
  userId: string,
  adminName: string,
  email: string,
  employeeId: number,
  phoneNumber: string,
  createdBy: string,
}

export type Role = {
  id: number;
  name: string;
  description: string;
}

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? (
    "Inactive"
  ) : (
    "Active"
  );
};

export const columns: ColumnDef<BankAdmin>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: "idNumber",
    header: "ID Number",
  },
  
  {
    accessorKey: "createdBy",
    header: "Created By",
  }  
]