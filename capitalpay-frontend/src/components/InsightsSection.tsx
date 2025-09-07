import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import laptop from "@/assets/laptop.png";

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

const InsightsSection = () => {
  // Use static data instead of API call
  const blogPosts = [staticBlogData];
  const loading = false;
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0A0A23] to-[#1A1A3A] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-4 max-w-7xl">
        <div className=" gap-16 ">
          {/* Left Content */}
          <div className="space-y-8 flex flex-col md:flex-row gap-16 mb-10 md:mb-20">
            <div className="space-y-6 ">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Simple, Secure, and Seamless
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Managing your money should be easy. Our personal payment
                solutions are intuitive, secure, and convenient, giving you
                financial freedom.
              </p>
            </div>

            {/* Feature Items */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#E94258] to-[#F27224] rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Seamless P2P Payment Integration
                  </h3>
                  <p className="text-gray-300">
                    Instantly transfer money to your contacts, pay with a QR
                    code, and enjoy enhanced fraud detection and security
                    protocols for your peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#892887] to-[#E94258] rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Capital Pay Wallet
                  </h3>
                  <p className="text-gray-300">
                    Our mobile aggregator turns your smartphone into a powerful
                    digital wallet. Make contactless payments, manage methods,
                    and track spending in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Insights Section */}
          <div className="space-y-8 mt-20 md:mt-0">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Insights from the Forefront of FinTech
              </h2>
              <p className="text-gray-300">
                Stay informed with the latest news, trends, and insights from
                the evolving landscape of payments, technology, and global
                commerce.
              </p>
            </div>

            {/* Article Cards */}
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {loading ? (
                // Loading skeleton
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
                      <div className="h-3 bg-gray-400 rounded w-2/3"></div>
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
                      <img
                        src={laptop}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
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
                // No posts available
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
                  <p className="text-white/60">
                    No featured articles available at the moment.
                  </p>
                </div>
              )}
            </div>

            {/* View All Articles Button */}
            <div className="text-center">
              <Link to="/blog">
                <Button
                  variant="outline"
                  className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 px-8 py-3 rounded-2xl uppercase text-sm font-medium"
                >
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
