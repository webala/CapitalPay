
const Timeline = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Our journey</h2>
            <p className="text-white/80 leading-relaxed">
              A look at our key milestones and evolution.
            </p>
          </div>

          {/* Right Content - Timeline */}
          <div className="space-y-12">
            {/* 2014 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2019</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    FOUNDATION
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Capital Pay was founded to bridge the gap in digital financial
                  access, starting with a focus on African markets.
                </p>
                <div className="mt-4 h-px bg-white/20"></div>
              </div>
            </div>

            {/* 2016 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2021</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    LAUNCH
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Launched banking integrations for last-mile merchant
                  cash-outs, significantly enhancing financial accessibility.
                </p>
                <div className="mt-4 h-px bg-white/20"></div>
              </div>
            </div>

            {/* 2018 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2022</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    EXPANSION
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Expanded into government services, specializing in customs
                  integrations to optimize government revenues, with
                  integrations for over 21 banks into the Capital Pay platform.
                </p>
                <div className="mt-4 h-px bg-white/20"></div>
              </div>
            </div>

            {/* 2022 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2025</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    GLOBAL REACH
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Extended operations into Asia, Europe, and other markets,
                  offering payment wallets, A2A transfers, and cross-border
                  solutions worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
