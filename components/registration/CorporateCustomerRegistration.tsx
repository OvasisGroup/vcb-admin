"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CorporateCustomerRegistration() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cifError, setCifError] = useState<string | null>(null); // To handle CIF validation error
  const [cifDetails, setCifDetails] = useState<any | null>(null); // To store CIF details
  const router = useRouter();

  const [formData, setFormData] = useState({
    cif: "",
    name: "",
    dateOfIncorporation: "",
    registrationNumber: "",
    email: "",
    phone: "",
    addr1: "",
    addr2: "",
    city: "",
    country: "",
    kraPin: "",
    numberOfUsers: 0,
  });

  // Validate CIF with the external API
  const validateCif = async (cif: string) => {
    const accessToken = session?.user.access_token;

    if (!accessToken) {
      console.error("No access token found");
      return "Authentication error - no access token";
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/get/corporate/${cif}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.message || "Invalid CIF";
    }
    const data = await response.json();
    return data; // Return the CIF details if valid
  };

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

  //   index: number,
  //   field: keyof TransactionLimit,
  //   value: string | number
  // ) => {
  //   setFormData((prev) => {
  //     const updatedTransactionLimitList: TransactionLimit[] = [
  //       ...prev.transactionLimitList,
  //     ];
  //     updatedTransactionLimitList[index][field] = value as never; // Use this if TS complains
  //     return { ...prev, transactionLimitList: updatedTransactionLimitList };
  //   });
  // };

  // const addTransactionLimit = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     transactionLimitList: [
  //       ...prev.transactionLimitList,
  //       { transactionType: "", currency: "", amount: 0 },
  //     ],
  //   }));
  // };

  // const removeTransactionLimit = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     transactionLimitList: prev.transactionLimitList.filter(
  //       (_, i) => i !== index
  //     ),
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/admin/corporate/register`,
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
        throw new Error(errorData.error || "Failed to add corporate");
      }

      const responseData = await response.json();

      console.log("Successfully added corporate:", {
        customerData: formData,
        apiResponse: responseData,
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
      className="space-y-4 p-8 bg-white rounded-xl mt-6"
    >
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
        <div>
          <p className="font-light text-2xl  text-vcblue">
            Register Corporate Customer
          </p>
          <p className="font-light text-black">
            corporate-maintenance/corporate-registration
          </p>
        </div>
      </div>
      <div>
        <label className="text-vcblue font-light">Enter CIF:</label>
        <input
          type="text"
          id="cif"
          name="cif"
          value={formData.cif}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="000..."
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
        <label className="text-vcblue font-light">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter Name"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Date Of Incorporation:</label>
        <input
          type="text"
          id="dateOfIncorporation"
          name="dateOfIncorporation"
          value={formData.dateOfIncorporation}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter Date of incorporation"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">registrationNumber:</label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter registration number"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter email"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Address1:</label>
        <input
          type="text"
          id="addr1"
          name="addr1"
          value={formData.addr1}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter address1"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Address2:</label>
        <input
          type="text"
          id="addr2"
          name="addr2"
          value={formData.addr2}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter City"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter Country"
        />
      </div>

      <div>
        <label className="text-vcblue font-light">Kra Pin:</label>
        <input
          type="text"
          id="kraPin"
          name="kraPin"
          value={formData.kraPin}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter Kra Pin"
        />
      </div>
      <div>
        <label className="text-vcblue font-light">Number Of Users:</label>
        <input
          type="text"
          id="numberOfUsers"
          name="numberOfUsers"
          value={formData.numberOfUsers}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter Country"
        />
      </div>

      {/* <div>
        <label className="text-vcblue font-bold mb-4">
          Transaction Limits:
        </label>
        {formData.transactionLimitList.map((limit, index) => (
          <div
            key={index}
            className="space-y-2 mb-4 mt-4 border p-4 rounded-md border-vcbgold"
          >
            <div>
              <label
                htmlFor={`transactionType-${index}`}
                className="font-light text-vcblue"
              >
                Transaction Type:
              </label>
              <input
                type="text"
                id={`transactionType-${index}`}
                value={limit.transactionType}
                onChange={(e) =>
                  handleTransactionChange(
                    index,
                    "transactionType",
                    e.target.value
                  )
                }
                className="border border-vcblue p-2 w-full rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor={`currency-${index}`}
                className="font-light text-vcblue"
              >
                Currency:
              </label>
              <input
                type="text"
                id={`currency-${index}`}
                value={limit.currency}
                onChange={(e) =>
                  handleTransactionChange(index, "currency", e.target.value)
                }
                className="border border-vcblue p-2 w-full rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor={`amount-${index}`}
                className="font-light text-vcblue"
              >
                Amount:
              </label>
              <input
                type="number"
                id={`amount-${index}`}
                value={limit.amount}
                onChange={(e) =>
                  handleTransactionChange(
                    index,
                    "amount",
                    Number(e.target.value)
                  )
                }
                className="border border-vcblue p-2 w-full rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={() => removeTransactionLimit(index)}
              className="text-red-600 mt-2"
            >
              Remove
            </button>
          </div>
        ))}

        <Button
          type="button"
          onClick={addTransactionLimit}
          className="bg-vcbgold text-white px-4 py-2 rounded w-full hover:bg-vcblue"
        >
          Add Transaction Limit
        </Button>
      </div> */}

      <Button
        type="submit"
        className="bg-vcblue text-white px-4 py-2 rounded w-full hover:bg-vcbgold"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
