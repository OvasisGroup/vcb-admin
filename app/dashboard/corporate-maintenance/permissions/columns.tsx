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

export type Permissions = {
  name: string;
  resource: string;
  permissionFlag: string;
  createdBy: string;
};

const BooleanCell = ({ value }: { value: boolean }) => {
  return value ? "Inactive" : "Active";
};

export const columns: ColumnDef<Permissions>[] = [
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
];
