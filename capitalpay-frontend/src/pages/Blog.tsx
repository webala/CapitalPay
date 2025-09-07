import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_CATEGORIES } from "@/types/blog";

// Static blog data
const staticBlogData = {
  _id: "static-blog-1",
  title: "The Basics of Capital Pay",
  slug: "basics-of-capital-pay",
  excerpt:
    "Learn everything you need to know about Capital Pay's innovative payment solutions and how they can transform your business.",
  category: "FINANCE",
  tags: ["payments", "fintech", "business", "digital payments", "security"],
  author: {
    name: "Sarah Johnson",
    email: "sarah@capitalpay.com",
  },
  status: "published",
  featured: true,
  views: 1500,
  readTime: 8,
  createdAt: "2024-01-15T08:00:00.000Z",
};

// Helper function to format date
const formatBlogDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  // Static data - only show the blog if it matches the selected category
  const featuredPost = staticBlogData;
  const blogPosts =
    selectedCategory === "all" || selectedCategory === staticBlogData.category
      ? [staticBlogData]
      : [];
  const loading = false;
  const totalPages = 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen relative">
      {/* Full Background Gradient Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background */}
        <div className="absolute inset-0"></div>

        {/* First radial gradient (blue tones) - Top Left */}
        <div
          className="absolute top-0 left-0 w-[800px] h-[600px] blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, #C4FFF1 0%, #3B82F6 30%, #1D4ED8 60%, transparent 10%)`,
          }}
        />

        {/* Second radial gradient (pink/purple tones) - Top Right */}
        <div
          className="absolute top-0 right-0 w-[900px] h-[700px] blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, #EF07C9 0%, #C54DF3 40%, #A186EB 70%, transparent 10%)`,
          }}
        />

        {/* Additional gradient orbs for more depth */}
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] blur-2xl opacity-30"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 0%)`,
          }}
        />

        <div
          className="absolute top-1/2 right-1/3 w-[350px] h-[350px] blur-2xl opacity-25"
          style={{
            background: `radial-gradient(circle, #C54DF3 0%, transparent 70%)`,
          }}
        />
      </div>
      <Header />

      {/* Blog Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col space-y-3">
            {/* Left Content */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Blog
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Stay informed with the latest news, trends, and insights from
                the evolving landscape of payments, technology, and global
                commerce.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex space-x-3 mb-8">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 flex-1"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-0">
              {/* Featured Post */}
              {featuredPost ? (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-6 w-full md:w-1/2 hover:bg-blue-800/60 transition-colors"
                >
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      FEATURED
                    </span>
                    <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-white/60 text-xs">
                    <div className="flex items-center space-x-3">
                      <span>{featuredPost.author.name}</span>
                      <span>•</span>
                      <span>{formatBlogDate(featuredPost.createdAt)}</span>
                    </div>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </Link>
              ) : (
                <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-6 w-full md:w-1/2 animate-pulse">
                  <div className="mb-4">
                    <div className="h-6 bg-gray-400 rounded w-20"></div>
                  </div>
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-400 rounded w-full"></div>
                    <div className="h-3 bg-gray-400 rounded w-2/3"></div>
                  </div>
                </div>
              )}

              {/* Right Content - Featured Image */}
              <div className="flex justify-center  w-full md:w-1/2">
                <div className="relative w-full max-w-md">
                  <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl p-8 text-center">
                    <div className="bg-black/20 rounded-xl p-6">
                      <div className="w-full h-32 bg-gradient-to-r from-orange-300 to-red-400 rounded-lg mb-4 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Content */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Subscribe to our news
                  </h3>
                  <p className="text-white/90">weekly newsletter!</p>
                </div>
              </div>

              {/* Right Content - Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex space-x-3 w-full md:w-auto"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-w-[250px]"
                  required
                />
                <Button
                  type="submit"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/20"
                >
                  SUBSCRIBE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-transparent to-blue-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6 md:mb-0">
              Latest Posts
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={
                    selectedCategory === category.value
                      ? "secondary"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategoryChange(category.value)}
                  className={
                    selectedCategory === category.value
                      ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                      : "text-white border-white/20 hover:bg-white/10"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-blue-800/30 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-400 rounded w-20"></div>
                    <div className="h-5 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-400 rounded w-full"></div>
                    <div className="h-3 bg-gray-400 rounded w-2/3"></div>
                    <div className="flex items-center space-x-3 mt-4">
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-400 rounded w-16"></div>
                        <div className="h-2 bg-gray-400 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="bg-blue-800/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 block"
                >
                  {/* Post Image */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600">
                    <div className="absolute inset-0 bg-black/20 rounded-t-2xl">
                      <div className="flex items-center justify-center h-full">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold">
                            {post.author.name}
                          </p>
                          <p className="text-white/60 text-xs">
                            {formatBlogDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-white/60 text-xs">
                        {post.readTime} min read
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // No posts found
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <p className="text-white/60 mb-2">No blog posts found.</p>
                {(searchTerm || selectedCategory !== "all") && (
                  <p className="text-white/40 text-sm">
                    Try adjusting your search terms or category filter.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Pagination - Hidden since we only have one blog post */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <span className="text-white/60 text-sm">Page 1 of 1</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
