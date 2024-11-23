"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const AddBankAdmin = () => {
  const [formData, setFormData] = useState({
    roleId: "",
    userId: "",
    adminName: "",
    email: "",
    nationalId: "",
    phoneNumber: "",
  });

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [errorRoles, setErrorRoles] = useState<string | null>(null);

  // Fetch roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const response = await axios.get("/api/roles"); // Adjust to match your roles endpoint
        setRoles(response.data.body);
        setErrorRoles(null);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setErrorRoles("Failed to load roles.");
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addBankAdmin', formData);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="roleId" className="block font-medium">Role</label>
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
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <label htmlFor="adminName" className="block font-medium">Admin Name</label>
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
        <label htmlFor="adminName" className="block font-medium">User Id</label>
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
        <label htmlFor="email" className="block font-medium">Email</label>
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
        <label htmlFor="nationalId" className="block font-medium">National ID</label>
        <input
          type="number"
          id="nationalId"
          name="nationalId"
          value={formData.nationalId}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block font-medium">Phone Number</label>
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default AddBankAdmin;
