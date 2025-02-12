"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RetailCount: React.FC = () => {
  const [count, setCount] = useState<number | null>(null); // State to hold the count
  const [loading, setLoading] = useState<boolean>(true);   // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to manage errors

  // Fetch count from API
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("/api/retailCount");
        if (response.data.message === "Success" && response.data.body.count !== undefined) {
          setCount(response.data.body.count);
        } else {
          setError("Unexpected response from the server.");
        }
      } catch (err) {
        setError("Error fetching the count. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  // Render view
  return (
    <div className="p-4">
          <p>{count}</p>
        </div>
  );
};

export default RetailCount;
