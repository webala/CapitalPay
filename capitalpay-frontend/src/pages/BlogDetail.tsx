import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useBlogPost, useRelatedBlogs, formatBlogDate } from "@/hooks/useBlog";
import { ArrowLeft, Clock, Eye, Share2 } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blog, loading, error } = useBlogPost(slug || "");
  const { blogs: relatedBlogs, loading: relatedLoading } = useRelatedBlogs(
    blog?._id || "",
    blog?.category || "",
    3
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="py-20 px-8">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded w-24"></div>
                <div className="h-3 bg-gray-400 rounded w-20"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-400 rounded w-3/4 mb-6"></div>
            <div className="space-y-3 mb-12">
              <div className="h-4 bg-gray-400 rounded w-full"></div>
              <div className="h-4 bg-gray-400 rounded w-5/6"></div>
              <div className="h-4 bg-gray-400 rounded w-4/5"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Link to="/blog">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {error === "Blog post not found" ? "Post Not Found" : "Error"}
            </h1>
            <p className="text-white/60 mb-8">
              {error === "Blog post not found"
                ? "The blog post you're looking for doesn't exist or has been removed."
                : "Something went wrong while loading the blog post."}
            </p>
            <Link to="/blog">
              <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Header />

      {/* Blog Detail Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/blog">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                FEATURED
              </span>
            )}
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Blog Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-white/60">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {blog.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {blog.author.name}
                </p>
                <p className="text-white/60 text-sm">
                  {formatBlogDate(blog.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Blog Excerpt */}
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-3xl">
            {blog.excerpt}
          </p>

          {/* Share Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-black">
            {/* Laptop Image Container */}
            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              {/* Laptop Mockup */}
              <div className="relative">
                {/* Laptop Base */}
                <div className="w-80 md:w-96 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full transform perspective-1000 rotateX-60"></div>

                {/* Laptop Screen */}
                <div className="relative -mt-1">
                  <div className="w-72 md:w-88 h-48 md:h-56 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-lg shadow-2xl">
                    {/* Screen Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-lg"></div>

                    {/* Screen Content */}
                    <div className="absolute inset-4 bg-black/20 rounded backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-2 bg-white/30 rounded"></div>
                          <div className="h-2 bg-white/50 rounded"></div>
                          <div className="h-2 bg-white/30 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Screen Border */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg -z-10"></div>
                </div>
              </div>

              {/* Ambient Lighting Effects */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-orange-500/30 via-red-500/20 to-transparent blur-3xl"></div>
              <div className="absolute bottom-0 left-1/4 w-48 h-24 bg-gradient-to-t from-pink-500/20 to-transparent blur-2xl"></div>
              <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-gradient-to-t from-purple-500/20 to-transparent blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Main Blog Content */}
          <div className="mb-16">
            <div
              className="prose prose-lg prose-invert max-w-none text-white/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mb-16 p-6 bg-blue-800/20 backdrop-blur-sm rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Enjoyed this article?
                </h3>
                <p className="text-white/60">Share it with your network!</p>
              </div>
              <Button
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedBlogs.length > 0 && (
        <section className="px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedLoading
                ? // Loading skeleton for related posts
                  [...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-blue-800/30 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse"
                    >
                      <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-400 rounded w-20"></div>
                        <div className="h-5 bg-gray-400 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-400 rounded w-full"></div>
                      </div>
                    </div>
                  ))
                : relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      to={`/blog/${relatedBlog.slug}`}
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
                            {relatedBlog.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                          {relatedBlog.excerpt}
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {relatedBlog.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="text-white text-xs font-semibold">
                                {relatedBlog.author.name}
                              </p>
                              <p className="text-white/60 text-xs">
                                {formatBlogDate(relatedBlog.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-white/60 text-xs">
                            {relatedBlog.readTime} min read
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
