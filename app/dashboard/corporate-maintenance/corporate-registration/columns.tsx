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
import { Checkbox } from "../../../../components/ui/checkbox"


export type CorpUsers = {
    createdDate: number,
    cif: number
    name: string
    numberOfUsers: string
    status: string
}

const BooleanCell = ({ value }: { value: boolean }) => {
    return value ? (
        "Inactive"
    ) : (
        "Active"
    );
};

export const columns: ColumnDef<CorpUsers>[] = [
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
        accessorKey: "cif",
        header: "CIF",
    },

    {
        accessorKey: "name",
        header: "Name",
    },

    {
        accessorKey: "numberOfUsers",
        header: "Number of Users",
    },
    {
        accessorKey: "status",
        header: "Status",
    },


]