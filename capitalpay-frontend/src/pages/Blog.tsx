import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      category: "FINANCE",
      title: "The Basics about Saving Money",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      author: "ALEX TURNER",
      date: "AUGUST 2, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      category: "FINANCE",
      title: "The Basics about Saving Money",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      author: "ALEX TURNER",
      date: "AUGUST 2, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      category: "FINANCE",
      title: "The Basics about Saving Money",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      author: "ALEX TURNER",
      date: "AUGUST 2, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      category: "FINANCE",
      title: "The Basics about Saving Money",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      author: "ALEX TURNER",
      date: "AUGUST 2, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      category: "FINANCE",
      title: "The Basics about Saving Money",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      author: "ALEX TURNER",
      date: "AUGUST 2, 2023",
      image: "/api/placeholder/300/200",
    },
    {
      id: 6,
      category: "FINANCE",
      title: "The Basics about Saving Money",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      author: "ALEX TURNER",
      date: "AUGUST 2, 2023",
      image: "/api/placeholder/300/200",
    },
  ];

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
                nulla suspendisse tortor aenean dis placerat.
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-0">
              {/* Featured Post */}
              <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-6 w-full md:w-1/2">
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FEATURED
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3">
                  Money Transfer Explained With Pros and Cons for Investment
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare.
                </p>
              </div>

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
              <div className="flex space-x-3 w-full md:w-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-w-[250px]"
                />
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/20">
                  SUBSCRIBE
                </Button>
              </div>
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
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white"
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Apps
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Products
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Tutorial
              </Button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-blue-800/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Post Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600">
                  <div className="absolute inset-0 bg-black/20 rounded-t-2xl">
                    <div className="flex items-center justify-center h-full">
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

                {/* Post Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {post.author}
                      </p>
                      <p className="text-white/60 text-xs">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </Button>

            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 bg-white/10 text-white"
              >
                1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 text-white/60 hover:text-white hover:bg-white/10"
              >
                2
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 text-white/60 hover:text-white hover:bg-white/10"
              >
                3
              </Button>
              <span className="flex items-center text-white/60 px-2">...</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
