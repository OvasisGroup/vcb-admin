// pages/details/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetailView = () => {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (id) {
      // Replace with your actual data fetching logic (e.g., API call)
      fetch(`/api/details/${id}`)
        .then(res => res.json())
        .then(data => setDetails(data));
    }
  }, [id]);

  if (!details) return <div>Loading...</div>;

  return (
    <div>
      
    </div>
  );
};

export default DetailView;
