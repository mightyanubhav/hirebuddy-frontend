import { useState, useCallback } from "react";
import { backend_url } from "../../context/HardCodedValues";

export const useBuddies = (token, filters) => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBuddies = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) return;
      const query = new URLSearchParams();
      if (filters.location) query.append("location", filters.location);
      if (filters.expertise) query.append("expertise", filters.expertise);
      if (filters.date) query.append("date", filters.date);

      const res = await fetch(
        `${backend_url}/customer/buddies${query.toString() ? `?${query.toString()}` : ""}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.ok) {
        const data = await res.json();
        setBuddies(data.buddies || []);
      } else setBuddies([]);
    } catch (err) {
      console.error("Error fetching buddies:", err);
      setBuddies([]);
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  return { buddies, loading, fetchBuddies, setBuddies };
};
