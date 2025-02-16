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


export type Permissions = {
  name: string,
  resource: string,
  permissionFlag: string,
  createdBy: string,
}

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? (
    "Inactive"
  ) : (
    "Active"
  );
};

export const columns: ColumnDef<Permissions>[] = [
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
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "resource",
    header: "Resource",
  },

  {
    accessorKey: "permissionFlag",
    header: "Permission Flag",
  },
  
  {
    accessorKey: "createdBy",
    header: "Created By",
  },

  
]