// app/components/RetailCustomerForm.tsx

"use client";

import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const RetailCustomerForm = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cif: "",
    userId: "",
    username: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cifError, setCifError] = useState<string | null>(null); // To handle CIF validation error
  const [cifDetails, setCifDetails] = useState<any | null>(null); // To store CIF details
  const router = useRouter();

  // Handle form input changes
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // validate CIF field being changed
    if (name === "cif" && value.length > 0) {
      try {
        const cifValidationResult = await validateCif(value);
        if (typeof cifValidationResult === "string") {
          setCifError(cifValidationResult);
          setCifDetails(null);
        } else {
          setCifError(null);
          setCifDetails(cifValidationResult);
        }
      } catch (error) {
        setCifError("Failed to validate CIF");
        setCifDetails(null);
      }
    }
  };

  const validateCif = async (cif: string) => {
    const accessToken = session?.user.access_token;

    if (!accessToken) {
      console.error("No access token found");
      return "Authentication error - no access token";
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/enquiry/joint-and-retail-details/${cif}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({
          message: `Error: ${response.status} - ${response.statusText}`,
        }));

      console.error("API Error:", errorData);
      return (
        errorData.message ||
        `Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("CIF Details:", data);

    return data; // Return the CIF details if valid
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/customer/initiate/retail-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add customer");
      }

      const responseData = await response.json();

      console.log("Successfully added retail customer:", {
        customerData: formData,
        apiResponse: responseData
      });

      toast({
        title: "Success",
        description: "Customer added successfully!",
      });
      router.push("/dashboard");
      
    } catch (err) {
      setError(error || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-8 space-y-4 mt-4"
    >
      <p className="text-2xl font-light text-vcblue">
        Register Retail Customer
      </p>
      <label>CIF</label>
      <div>
        <input
          id="cif"
          name="cif"
          type="text"
          value={formData.cif}
          onChange={handleInputChange}
          placeholder="Enter CIF"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      {/* Display CIF details if available */}
      {cifDetails && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="font-bold text-lg">CIF Details:</h3>
          {cifDetails ? (
            <ul className="list-disc pl-5">
              <li>
                <strong>CIF: </strong>
                {cifDetails.cif}
              </li>
              <li>
                <strong>Name: </strong>
                {cifDetails.name}
              </li>
              <li>
                <strong>Address: </strong>
                {cifDetails.address}
              </li>
              <li>
                <strong>Phone: </strong>
                {cifDetails.phone}
              </li>
            </ul>
          ) : (
            <p className="text-gray-600">No CIF details available</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          name="userId"
          type="text"
          value={formData.userId}
          onChange={handleInputChange}
          placeholder="Enter User ID"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="userName">User Name</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter User Name"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter phone number"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="address1">Address 1</label>
        <input
          id="address1"
          name="address1"
          type="text"
          value={formData.address1}
          onChange={handleInputChange}
          placeholder="Enter address1"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="address2">Address 2</label>
        <input
          id="address2"
          name="address2"
          type="text"
          value={formData.address2}
          onChange={handleInputChange}
          placeholder="Enter address2"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Enter city"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter country"
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add Retail Customer"}
      </Button>
    </form>
  );
};

export default RetailCustomerForm;
