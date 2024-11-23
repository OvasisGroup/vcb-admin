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


export type TransactionLogs = {
  stan: string,
  transactionDate: string,
  currency: string,
  amount: string,
  requestTime: string,
  responseTime: string,
}

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? (
    "Inactive"
  ) : (
    "Active"
  );
};

export const columns: ColumnDef<TransactionLogs>[] = [
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
    accessorKey: "stan",
    header: "Stan",
  },

  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
  },

  {
    accessorKey: "currency",
    header: "Currency",
  },
  
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "requestTime",
    header: "Request Time",
  },
  {
    accessorKey: "responseTime",
    header: "Response Time",
  },

  
]