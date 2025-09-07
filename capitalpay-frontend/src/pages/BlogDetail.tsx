import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Share2 } from "lucide-react";

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

const BlogDetail = () => {
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
              {staticBlogData.category}
            </span>
            {staticBlogData.featured && (
              <span className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                FEATURED
              </span>
            )}
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {staticBlogData.title}
          </h1>

          {/* Blog Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-white/60">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {staticBlogData.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {staticBlogData.author.name}
                </p>
                <p className="text-white/60 text-sm">
                  {formatBlogDate(staticBlogData.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{staticBlogData.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{staticBlogData.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Blog Excerpt */}
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-3xl">
            {staticBlogData.excerpt}
          </p>

          {/* Share Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: staticBlogData.title,
                    text: staticBlogData.excerpt,
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
              <p className="text-lg">
                Capital Pay is revolutionizing the way businesses handle
                payments in the digital age. Our comprehensive platform combines
                cutting-edge technology with user-friendly interfaces to create
                a seamless payment experience for both businesses and their
                customers.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                Understanding Capital Pay's Core Features
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Instant Payments
                  </h3>
                  <p>
                    Our platform enables real-time payment processing, allowing
                    businesses to receive funds instantly. This feature
                    eliminates the traditional waiting periods associated with
                    bank transfers and helps improve cash flow management.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. Security First Approach
                  </h3>
                  <p className="mb-3">
                    We implement military-grade encryption and multiple layers
                    of security protocols to ensure that every transaction is
                    protected. Our system includes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-white/70">
                    <li>End-to-end encryption</li>
                    <li>Two-factor authentication</li>
                    <li>Real-time fraud detection</li>
                    <li>Secure data storage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Multiple Payment Options
                  </h3>
                  <p className="mb-3">
                    Capital Pay supports various payment methods including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-white/70">
                    <li>Credit and debit cards</li>
                    <li>Bank transfers</li>
                    <li>Digital wallets</li>
                    <li>QR code payments</li>
                    <li>Contactless payments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Business Analytics
                  </h3>
                  <p className="mb-3">
                    Our platform provides detailed insights into your payment
                    data:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-white/70">
                    <li>Transaction history</li>
                    <li>Revenue analytics</li>
                    <li>Customer payment patterns</li>
                    <li>Peak business hours</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    5. Integration Capabilities
                  </h3>
                  <p className="mb-3">
                    Capital Pay seamlessly integrates with popular business
                    tools and platforms:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-white/70">
                    <li>E-commerce platforms</li>
                    <li>Accounting software</li>
                    <li>CRM systems</li>
                    <li>POS systems</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                Getting Started with Capital Pay
              </h2>
              <p className="mb-4">
                Setting up your Capital Pay account is simple and
                straightforward. Our onboarding process involves:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-white/70">
                <li>Creating your business profile</li>
                <li>Verifying your identity</li>
                <li>Connecting your bank account</li>
                <li>Customizing your payment settings</li>
                <li>Installing necessary integrations</li>
              </ol>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                The Future of Payments
              </h2>
              <p className="mb-4">
                As we continue to evolve, Capital Pay remains committed to
                innovation and excellence in the payment processing industry.
                Our roadmap includes expanding our services to include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/70 mb-6">
                <li>Advanced AI-powered fraud prevention</li>
                <li>Enhanced cross-border payment capabilities</li>
                <li>Expanded cryptocurrency support</li>
                <li>Advanced loyalty program integration</li>
              </ul>

              <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-lg p-6 mt-8">
                <p className="text-lg font-medium text-white">
                  Join thousands of businesses already benefiting from Capital
                  Pay's modern payment solutions and take your first step toward
                  payment processing excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {staticBlogData.tags.map((tag, index) => (
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
                      title: staticBlogData.title,
                      text: staticBlogData.excerpt,
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
