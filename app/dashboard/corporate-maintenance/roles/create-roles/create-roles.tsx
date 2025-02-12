"use client";
import { Permissions, columns } from "./columns";
import { DataTable } from "./data-table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface RolesClientProps {
  permissionsData: Permissions[];
}

export default function CreateRole({ permissionsData }: RolesClientProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as number[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePermissionsChange = (permissions: number[]) => {
    setSelectedPermissions(permissions);
    setFormData((prev) => ({
      ...prev,
      permissions: permissions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Role Name and description are required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.permissions || formData.permissions.length === 0) {
      setError("Please select at least one permission");
      setIsSubmitting(false);
      return;
    }

    try {
      const roleData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        permissions: formData.permissions,
      };

      const url = `${process.env.NEXT_PUBLIC_AUTH_URL_API}/authentication/role/add-client-role`;
      console.log('the url is :', url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: JSON.stringify(roleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create role");
      }

      const responseData = await response.json();

      console.log("Successfully created corporate role:", {
        customerData: formData,
        apiResponse: responseData,
      });

      toast({
        title: "Success",
        description: "Role added successfully!",
      });
      router.push("/dashboard");
    } catch (err) {
      setError(error || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Role &rarr;</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Corporate Role</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl px-4 space-y-4 mt-4"
        >
          <label>Name</label>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter role name"
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter role description"
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="permission">Select Permission</label>
            <DataTable
              columns={columns}
              data={permissionsData}
              onPermissionsChange={handlePermissionsChange}
              selectedPermissions={selectedPermissions}
            />
          </div>

          {error && <div className="text-red-600">{error}</div>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Role"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
