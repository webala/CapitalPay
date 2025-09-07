import { useState, useEffect, useCallback } from "react";
import type { BlogPost, BlogApiResponse, BlogFilters } from "@/types/blog";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useFeaturedBlogs = (limit: number = 3) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/blogs?featured=true&limit=${limit}&status=published`
      );

      if (response.ok) {
        const data: BlogApiResponse = await response.json();
        setBlogs(data.data || []);
      } else {
        throw new Error("Failed to fetch featured blogs");
      }
    } catch (err) {
      console.error("Error fetching featured blogs:", err);
      setError(err instanceof Error ? err.message : "An error occurred");

      // Fallback to sample data
      setBlogs([
        {
          _id: "1",
          title: "The Basics about CapitalPay",
          slug: "basics-about-capitalpay",
          excerpt:
            "Discover how our Capital Pay Wallet empowers SMEs to accept contactless payments without expensive hardware..",
          content: "",
          category: "FINANCE",
          tags: ["fintech", "payments"],
          author: { name: "ALEX TURNER", email: "alex@capitalpay.com" },
          status: "published",
          featured: true,
          views: 1250,
          readTime: 5,
          createdAt: "2023-08-02T00:00:00.000Z",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, [fetchFeaturedBlogs]);

  return { blogs, loading, error, refetch: fetchFeaturedBlogs };
};

export const useBlogs = (filters: BlogFilters = {}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
  });

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });

      // Default status to published if not specified
      if (!params.has("status")) {
        params.append("status", "published");
      }

      const response = await fetch(`${API_BASE_URL}/blogs?${params}`);

      if (response.ok) {
        const data: BlogApiResponse = await response.json();
        setBlogs(data.data || []);

        if (data.pagination) {
          setPagination(data.pagination);
          setTotalPages(data.pagination.pages);
        }
      } else {
        throw new Error("Failed to fetch blog posts");
      }
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    totalPages,
    pagination,
    refetch: fetchBlogs,
  };
};

export const useFeaturedBlog = () => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/blogs?featured=true&limit=1&status=published`
      );

      if (response.ok) {
        const data: BlogApiResponse = await response.json();
        if (data.data && data.data.length > 0) {
          setBlog(data.data[0]);
        } else {
          setBlog(null);
        }
      } else {
        throw new Error("Failed to fetch featured blog");
      }
    } catch (err) {
      console.error("Error fetching featured blog:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedBlog();
  }, [fetchFeaturedBlog]);

  return { blog, loading, error, refetch: fetchFeaturedBlog };
};

export const useBlogPost = (slug: string) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPost = useCallback(async () => {
    if (!slug || slug.trim() === "") {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);

      if (response.ok) {
        const data = await response.json();
        setBlog(data.data || data);
      } else if (response.status === 404) {
        setError("Blog post not found");
        setBlog(null);
      } else {
        throw new Error("Failed to fetch blog post");
      }
    } catch (err) {
      console.error("Error fetching blog post:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  return { blog, loading, error, refetch: fetchBlogPost };
};

export const useRelatedBlogs = (
  currentBlogId: string,
  category: string,
  limit: number = 3
) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRelatedBlogs = useCallback(async () => {
    if (!currentBlogId || !category) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/blogs?category=${category}&limit=${limit}&status=published`
      );

      if (response.ok) {
        const data: BlogApiResponse = await response.json();
        // Filter out the current blog post
        const relatedBlogs = (data.data || []).filter(
          (blog) => blog._id !== currentBlogId
        );
        setBlogs(relatedBlogs.slice(0, limit));
      } else {
        throw new Error("Failed to fetch related blogs");
      }
    } catch (err) {
      console.error("Error fetching related blogs:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [currentBlogId, category, limit]);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [fetchRelatedBlogs]);

  return { blogs, loading, error, refetch: fetchRelatedBlogs };
};

// Utility function for date formatting
export const formatBlogDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
};
