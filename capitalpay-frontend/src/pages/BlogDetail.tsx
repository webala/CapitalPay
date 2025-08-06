import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogDetail = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Blog Detail Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AT</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">ALEX TURNER</p>
              <p className="text-white/60 text-sm">AUGUST 2, 2023</p>
            </div>
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The Basics about CapitalPay
          </h1>

          {/* Blog Excerpt */}
          <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
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
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                        </div>
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
          {/* Content Block 1 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Learn what you need to know before you invest in a virtual
              currency
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
            </div>
          </div>

          {/* Content Block 2 */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              How do I know how secure is my wallet?
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Additional Content Sections */}
          <div className="space-y-8">
            <div className="bg-blue-800/20 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Key Takeaways
              </h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Always research before investing in any virtual currency
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Security should be your top priority when choosing a wallet
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Understand the risks and benefits before making any
                    decisions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
