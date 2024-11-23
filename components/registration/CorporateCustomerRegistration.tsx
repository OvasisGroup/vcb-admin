"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";

type TransactionLimit = {
  transactionType: string;
  currency: string;
  amount: number;
};

type FormState = {
  cif: string;
  numberOfUsers: number;
  transactionLimitList: TransactionLimit[];
};

export default function CorporateCustomerRegistration() {

    const [cif, setCif] = useState<string>(""); // To store email input
    const [userId, setUserId] = useState<string>(""); // To store email input
    const [email, setEmail] = useState<string>(""); // To store email input
    const [phoneNumber, setPhoneNumber] = useState<string>(""); // To store email input
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To handle submit state
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state


  const [formState, setFormState] = useState<FormState>({
    cif: "",
    numberOfUsers: 0,
    transactionLimitList: [{ transactionType: "", currency: "", amount: 0 }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "numberOfUsers" ? Number(value) : value,
    }));
  };

  const handleTransactionChange = (
    index: number,
    field: keyof TransactionLimit,
    value: string | number
  ) => {
    setFormState((prev) => {
        const updatedTransactionLimitList: TransactionLimit[] = [...prev.transactionLimitList];
        updatedTransactionLimitList[index][field] = value as never; // Use this if TS complains
        return { ...prev, transactionLimitList: updatedTransactionLimitList };
    });
  };

  const addTransactionLimit = () => {
    setFormState((prev) => ({
      ...prev,
      transactionLimitList: [
        ...prev.transactionLimitList,
        { transactionType: "", currency: "", amount: 0 },
      ],
    }));
  };

  const removeTransactionLimit = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      transactionLimitList: prev.transactionLimitList.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formState);
    const externalUrl = '/api/roles';

    try {
      const response = await axios.post(externalUrl, formState, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8 bg-white rounded-xl mt-6">
      <div className="flex justify-between items-center mb-4 bg-slate-300 p-4 rounded-2xl">
                <div><p className="font-light text-2xl  text-vcblue">Register Corporate Customer</p>
                    <p className="font-light text-black">corporate-maintenance/corporate-registration</p>
                </div>
            </div>
      <div>
      <label className="text-vcblue font-light">Enter CIF:</label>
        <input
          type="text"
          id="cif"
          name="cif"
          value={formState.cif}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="000..."
        />
      </div>

      <div>
      <label className="text-vcblue font-light">Enter Number of Users:</label>
        <input
          type="text"
          id="numberOfUsers"
          name="numberOfUsers"
          value={formState.numberOfUsers}
          onChange={handleInputChange}
          className="border border-vcblue p-2 w-full rounded-md"
          placeholder="Enter Number of Users"
        />
      </div>

      <div>
        <label className="text-vcblue font-bold mb-4">Transaction Limits:</label>
        {formState.transactionLimitList.map((limit, index) => (
          <div key={index} className="space-y-2 mb-4 mt-4 border p-4 rounded-md border-vcbgold">
            <div>
              <label htmlFor={`transactionType-${index}`} className="font-light text-vcblue">
                Transaction Type:
              </label>
              <input
                type="text"
                id={`transactionType-${index}`}
                value={limit.transactionType}
                onChange={(e) =>
                  handleTransactionChange(index, "transactionType", e.target.value)
                }
                className="border border-vcblue p-2 w-full rounded-md"
              />
            </div>

            <div>
              <label htmlFor={`currency-${index}`} className="font-light text-vcblue">
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
              <label htmlFor={`amount-${index}`} className="font-light text-vcblue">
                Amount:
              </label>
              <input
                type="number"
                id={`amount-${index}`}
                value={limit.amount}
                onChange={(e) =>
                  handleTransactionChange(index, "amount", Number(e.target.value))
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
      </div>

      <Button type="submit" className="bg-vcblue text-white px-4 py-2 rounded w-full hover:bg-vcbgold">
        Submit
      </Button>
    </form>
  );
}