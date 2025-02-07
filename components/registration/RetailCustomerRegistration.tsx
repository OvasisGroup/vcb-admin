// app/components/RetailCustomerForm.tsx

'use client';

import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

const RetailCustomerForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    cif: '',
    userId: '',
    email: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cifError, setCifError] = useState<string | null>(null); // To handle CIF validation error
  const [cifDetails, setCifDetails] = useState<any | null>(null); // To store CIF details
  const router = useRouter();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate CIF with the external API
  const validateCif = async (cif: string) => {
    const response = await fetch(`/admin/enquiry/cif-details/${cif}`);
    if (!response.ok) {
      const errorData = await response.json();
      return errorData.message || 'Invalid CIF';
    }
    const data = await response.json();
    return data; // Return the CIF details if valid
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setCifError(null); // Clear previous CIF error

    // Validate CIF first
    const cifValidationResult = await validateCif(formData.cif);
    if (typeof cifValidationResult === 'string') {
      setCifError(cifValidationResult); // CIF is invalid, display error
      setIsSubmitting(false);
      return; // Stop submission if CIF is invalid
    } else {
      setCifDetails(cifValidationResult); // CIF is valid, store CIF details
    }

    try {
      const response = await fetch('/api/customer/add-retail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add customer');
      }

      // Redirect or show success message
      toast({
        title: "Success",
        description: "Upload is successfull",
      })
      router.push('/success'); // or handle success in any way
    } catch (err) {
      setError(error || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 space-y-4 mt-4">
      <p className='text-2xl font-light text-vcblue'>Register Retail Customer</p>
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
          className='border border-gray-300 rounded-lg p-2 w-full'
        />
      </div>

      {/* Display CIF details if available */}
      {cifDetails && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="font-bold text-lg">CIF Details:</h3>
          <ul className="list-disc pl-5">
            <li><strong>CIF: </strong>{cifDetails.cif}</li>
            <li><strong>Name: </strong>{cifDetails.name}</li>
            <li><strong>Address: </strong>{cifDetails.address}</li>
            <li><strong>Phone: </strong>{cifDetails.phone}</li>
            {/* Add any additional fields you want to display */}
          </ul>
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
           className='border border-gray-300 rounded-lg p-2 w-full'
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
           className='border border-gray-300 rounded-lg p-2 w-full'
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
           className='border border-gray-300 rounded-lg p-2 w-full'
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Add Retail Customer'}
      </Button>
    </form>
  );
};

export default RetailCustomerForm;
