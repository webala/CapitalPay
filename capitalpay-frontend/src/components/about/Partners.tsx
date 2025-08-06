import React from "react";

const Partners = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Partners</h2>
        <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          lorem purus justo, ultrices.
        </p>

        {/* Partner Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {/* Partner 1 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-lg">company</span>
          </div>

          {/* Partner 2 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-lg">Company</span>
          </div>

          {/* Partner 3 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-lg">company</span>
          </div>

          {/* Partner 4 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-lg">Company</span>
          </div>

          {/* Partner 5 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-lg">Company</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
