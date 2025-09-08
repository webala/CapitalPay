import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Zod schema for blog form validation
const blogFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(500, "Excerpt must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["FINANCE", "TECHNOLOGY", "BUSINESS", "NEWS", "TUTORIAL"], {
    required_error: "Please select a category",
  }),
  tags: z.string().optional(),
  status: z.enum(["draft", "published", "archived"], {
    required_error: "Please select a status",
  }),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogPost {
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

const BlogManagement: React.FC = () => {
  const { state } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, _setStatusFilter] = useState<string>("all");
  const [categoryFilter, _setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form setup
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "FINANCE",
      tags: "",
      status: "draft",
    },
  });

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
      });

      const response = await fetch(
        `${API_BASE_URL}/blogs/admin/all?${params}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBlogs(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.token) {
      fetchBlogs();
    }
  }, [state.token, currentPage, searchTerm, statusFilter, categoryFilter]);

  const handleCreateBlog = async (values: BlogFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          tags: values.tags
            ? values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag)
            : [],
        }),
      });

      if (response.ok) {
        fetchBlogs();
        setIsCreating(false);
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Failed to create blog:", errorData);
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBlog = async (values: BlogFormValues) => {
    if (!selectedBlog) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${API_BASE_URL}/blogs/${selectedBlog._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            tags: values.tags
              ? values.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag)
              : [],
          }),
        }
      );

      if (response.ok) {
        fetchBlogs();
        setIsEditing(false);
        setSelectedBlog(null);
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Failed to update blog:", errorData);
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          fetchBlogs();
        }
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  const handleToggleFeatured = async (blogId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/featured`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Failed to toggle featured status:", error);
    }
  };

  const openEditModal = (blog: BlogPost) => {
    setSelectedBlog(blog);
    form.reset({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category as BlogFormValues["category"],
      tags: blog.tags.join(", "),
      status: blog.status,
    });
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedBlog(null);
    form.reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-200 border-green-500/30";
      case "draft":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
      case "archived":
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "FINANCE":
        return "bg-blue-500/20 text-blue-200 border-blue-500/30";
      case "TECHNOLOGY":
        return "bg-purple-500/20 text-purple-200 border-purple-500/30";
      case "BUSINESS":
        return "bg-orange-500/20 text-orange-200 border-orange-500/30";
      case "NEWS":
        return "bg-red-500/20 text-red-200 border-red-500/30";
      case "TUTORIAL":
        return "bg-green-500/20 text-green-200 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
    }
  };

  const BlogForm = ({ isEdit = false }) => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          isEdit ? handleUpdateBlog : handleCreateBlog
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog title..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the blog post..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog content here..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem
                      value="FINANCE"
                      className="text-white hover:bg-gray-700"
                    >
                      Finance
                    </SelectItem>
                    <SelectItem
                      value="TECHNOLOGY"
                      className="text-white hover:bg-gray-700"
                    >
                      Technology
                    </SelectItem>
                    <SelectItem
                      value="BUSINESS"
                      className="text-white hover:bg-gray-700"
                    >
                      Business
                    </SelectItem>
                    <SelectItem
                      value="NEWS"
                      className="text-white hover:bg-gray-700"
                    >
                      News
                    </SelectItem>
                    <SelectItem
                      value="TUTORIAL"
                      className="text-white hover:bg-gray-700"
                    >
                      Tutorial
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem
                      value="draft"
                      className="text-white hover:bg-gray-700"
                    >
                      Draft
                    </SelectItem>
                    <SelectItem
                      value="published"
                      className="text-white hover:bg-gray-700"
                    >
                      Published
                    </SelectItem>
                    <SelectItem
                      value="archived"
                      className="text-white hover:bg-gray-700"
                    >
                      Archived
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Tags (comma-separated)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="tag1, tag2, tag3..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseModal}
            className="border-white/20 text-white hover:bg-white/10"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isEdit ? "Updating..." : "Creating..."}</span>
              </div>
            ) : isEdit ? (
              "Update Blog"
            ) : (
              "Create Blog"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Total Posts</p>
                <p className="text-2xl font-bold text-white">{blogs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Published</p>
                <p className="text-2xl font-bold text-white">
                  {blogs.filter((blog) => blog.status === "published").length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Drafts</p>
                <p className="text-2xl font-bold text-white">
                  {blogs.filter((blog) => blog.status === "draft").length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Total Views</p>
                <p className="text-2xl font-bold text-white">
                  {blogs
                    .reduce((total, blog) => total + blog.views, 0)
                    .toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Management */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Blog Posts</CardTitle>
            <Button
              onClick={() => {
                form.reset();
                setIsCreating(true);
              }}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            {/* Status Filter */}
            {/* <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select> */}

            {/* Category Filter */}
            {/* <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="all">All Categories</option>
              <option value="FINANCE">Finance</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="BUSINESS">Business</option>
              <option value="NEWS">News</option>
              <option value="TUTORIAL">Tutorial</option>
            </select> */}
          </div>

          {/* Blog Posts List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                      <div className="h-3 bg-white/10 rounded w-1/2 mt-2"></div>
                      <div className="h-3 bg-white/10 rounded w-1/3 mt-1"></div>
                    </div>
                    <div className="w-20 h-6 bg-white/20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-white truncate">
                        {blog.title}
                      </h3>
                      {blog.featured && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-white/60 truncate mb-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-white/40">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{blog.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{blog.views} views</span>
                      </div>
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 ml-4">
                    <Badge className={getCategoryColor(blog.category)}>
                      {blog.category}
                    </Badge>
                    <Badge className={getStatusColor(blog.status)}>
                      {blog.status.toUpperCase()}
                    </Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-600">
                        <DropdownMenuItem
                          onClick={() => openEditModal(blog)}
                          className="text-white hover:bg-gray-700"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleToggleFeatured(blog._id)}
                          className="text-white hover:bg-gray-700"
                        >
                          <Star className="mr-2 h-4 w-4" />
                          {blog.featured ? "Unfeature" : "Feature"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-400 hover:bg-gray-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {blogs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No blog posts found.</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Previous
              </Button>
              <span className="px-3 py-2 text-white">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Blog Modal */}
      <Dialog
        open={isCreating}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-sm border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">
              Create New Blog Post
            </DialogTitle>
          </DialogHeader>
          <BlogForm />
        </DialogContent>
      </Dialog>

      {/* Edit Blog Modal */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-sm border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Blog Post</DialogTitle>
          </DialogHeader>
          <BlogForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
