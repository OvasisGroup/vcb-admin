"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../../../components/ui/checkbox"


export type Customer = {
  createdDate: string,
  userId: string,
  customerName: string,
  status: string,
}

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? (
    "Inactive"
  ) : (
    "Active"
  );
};

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "createdDate",
    header: "Created Date",
  },

  {
    accessorKey: "userId",
    header: "User ID",
  },

  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  
  {
    accessorKey: "status",
    header: "Status",
  },

  
]