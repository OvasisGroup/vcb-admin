"use client"
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Customers {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export default function List() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<Customers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session && session.user.access_token) {
        const response = await fetch('http://102.210.244.222:6508/admin/customer/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.access_token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result); // Make sure result is an array of objects with webPercentage and mobileAppsPercentage
          console.log(result)
        } else {
          setErrorMessage('Failed to fetch data from external endpoint');
        }
        setLoading(false);
      } else {
        setErrorMessage('Failed to fetch data from external endpoint');
      }
    };
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>No data</div>;
  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}