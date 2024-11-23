// Example usage in a React component
"use client"
import CorporateCustomerRegistration from '@/components/registration/CorporateCustomerRegistration';
import RetailCustomerRegistrationComponent from '@/components/registration/RetailCustomerRegistration';
import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/roles');
        if (response.ok) {
          const result = await response.json();
          console.log('fetching data...', result);
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <>
    <div className='p-6'>
      <CorporateCustomerRegistration/>
    </div>
  </>
};

export default MyComponent;
