import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import laptop from "@/assets/laptop.png";
import { blogPosts } from "@/data/blogs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

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
  // Use blog posts from blogs.ts, show only featured posts (max 3)
  const featuredPosts = blogPosts;
  const loading = false;

   const faqData = [
     {
       id: "item-1",
       question: "What is CapitalPay?",
       answer:
         "CapitalPay is a modern financial technology platform that provides secure money transfer services, digital payments, and financial management tools for both businesses and individuals.",
     },
     {
       id: "item-2",
       question: "How do I create an account?",
       answer:
         "Creating an account is simple - just download our mobile app or visit our website, click 'Sign Up', and follow the verification process. You'll need to provide some basic information and valid ID to get started.",
     },
     {
       id: "item-3",
       question: "What are the fees for using CapitalPay?",
       answer:
         "Our fee structure is transparent and competitive. Basic transfers between CapitalPay accounts are free. International transfers and currency exchanges have small fees that are clearly displayed before you confirm any transaction.",
     },
     {
       id: "item-4",
       question: "Is CapitalPay secure?",
       answer:
         "Yes, security is our top priority. We use bank-level encryption, multi-factor authentication, and regular security audits to protect your data and money. All transactions are monitored 24/7 for suspicious activity.",
     },
     {
       id: "item-5",
       question: "What countries does CapitalPay operate in?",
       answer:
         "CapitalPay currently operates in most major markets across Africa, Europe, and Asia. We're continuously expanding our service area - check our website for the most up-to-date list of supported countries.",
     },
   ];
  return (
    <section
      id="insights"
      className="relative py-20 bg-gradient-to-b from-[#0A0A23] to-[#1A1A3A] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-4 max-w-7xl">
        <div className=" gap-16 ">
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
              ) : featuredPosts.length > 0 ? (
                featuredPosts.map((post) => (
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
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold">
                              {post.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
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

        {/* FAQ Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              FAQ
            </h2>

            {/* FAQ Accordion */}
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className="space-y-4"
            >
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className=" rounded-2xl px-6 data-[state=open]:pb-2"
                >
                  <AccordionTrigger className="text-left hover:no-underline  rounded-xl px-0 py-6 text-lg font-semibold text-white [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  {faq.answer && (
                    <AccordionContent className="pb-6 pt-0">
                      <div className=" pt-4">
                        <p className="text-white/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </section>
  );
};

export default InsightsSection;
