import { useState, useEffect } from "react";
import { getProjects } from "../services/api";

const useFetchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await getProjects();
        if (!cancelled) {
          setProjects(data.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load projects. Please try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();

    // Cleanup: ignore stale responses if component unmounts
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
};

export default useFetchProjects;
