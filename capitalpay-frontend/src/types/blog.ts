export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    email: string;
  };
  status: "draft" | "published" | "archived";
  featured: boolean;
  views: number;
  readTime: number;
  createdAt: string;
  publishedAt?: string;
}

export interface BlogCategory {
  value: string;
  label: string;
}

export interface BlogApiResponse {
  data: BlogPost[];
  pagination?: {
    page: number;
    pages: number;
    limit: number;
    total: number;
  };
  message?: string;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
  featured?: boolean;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { value: "all", label: "All" },
  { value: "FINANCE", label: "Finance" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "BUSINESS", label: "Business" },
  { value: "NEWS", label: "News" },
  { value: "TUTORIAL", label: "Tutorial" },
];
