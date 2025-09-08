import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Clock, Eye, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogs";

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

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the blog post by slug
  const blogPost = blogPosts.find((post) => post.slug === slug);

  // If blog post not found, redirect to blog page
  if (!blogPost) {
    navigate("/blog");
    return null;
  }
  return (
    <div className="min-h-screen">
      <Header />

      {/* Blog Detail Hero Section */}
      <section className="py-20 px-8 mt-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            {/* <Link to="/blog"> */}
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            {/* </Link> */}
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {blogPost.category}
            </span>
            {blogPost.featured && (
              <span className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                FEATURED
              </span>
            )}
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blogPost.title}
          </h1>

          {/* Blog Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-white/60">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold">
                  {blogPost.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white text-sm font-semibold">
                  {blogPost.author.name}
                </p>
                <p className="text-white/60 text-sm">
                  {formatBlogDate(blogPost.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{blogPost.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Blog Excerpt */}
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-3xl">
            {blogPost.excerpt}
          </p>

          {/* Share Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blogPost.title,
                    text: blogPost.excerpt,
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
          <div className="mb-16 prose prose-lg prose-invert max-w-none">
            <div className="text-white/80 leading-relaxed space-y-6">
              {blogPost.content.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm hover:bg-white/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

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
                      title: blogPost.title,
                      text: blogPost.excerpt,
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

      <Footer />
    </div>
  );
};

export default BlogDetail;
