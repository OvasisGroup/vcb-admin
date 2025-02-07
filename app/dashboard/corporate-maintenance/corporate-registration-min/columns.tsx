"use client"

import { Checkbox } from "../../../../components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"



export type CorpUsers = {
    name: string
    createdDate: number,
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
        accessorKey: "name",
        header: "Name",
    },

    {
        accessorKey: "createdDate",
        header: "Created Date",
    }

]