import { useState, useCallback } from "react";
import { backend_url } from "../../context/HardCodedValues";

export const useCredits = (token) => {
  const [credits, setCredits] = useState(0);

  const fetchCredits = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${backend_url}/customer/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      }
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  }, [token]);

  return { credits, setCredits, fetchCredits };
};
