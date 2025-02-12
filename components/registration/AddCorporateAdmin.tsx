"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Role } from "@/app/dashboard/maintenance/bank-admin/columns";

interface AdminRoles {
  rolesData: Role[];
}

export default function AddCorporateAdmin({ rolesData }: AdminRoles) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    roleId: "",
    userId: "",
    adminName: "",
    email: "",
    employeeId: "",
    phoneNumber: "",
  });

  const [loadingRoles, setLoadingRoles] = useState(false);
  const [errorRoles, setErrorRoles] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      throw new Error("No session found.");
    }
    const accessToken = session.user.access_token;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/initiate-registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error adding admin: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Admin registered successfully:", data);

      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error registering admin:", error);
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Admin &rarr;</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Corporate Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="roleId" className="block font-medium">
              Role
            </label>
            {loadingRoles ? (
              <p>Loading roles...</p>
            ) : errorRoles ? (
              <p className="text-red-500">{errorRoles}</p>
            ) : (
              <select
                id="roleId"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {rolesData.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="adminName" className="block font-medium">
              Admin Name
            </label>
            <input
              type="text"
              id="adminName"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="adminName" className="block font-medium">
              User Id
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="employeeId" className="block font-medium">
              Employee ID
            </label>
            <input
              type="number"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
