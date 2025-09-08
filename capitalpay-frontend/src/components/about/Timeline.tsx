const Timeline = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-white/80 leading-relaxed">
            A look at our key milestones and evolution.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - hidden on mobile, visible on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/20"></div>

          {/* Mobile vertical line - positioned on the left */}
          <div className="md:hidden absolute left-6 w-0.5 h-full bg-white/20"></div>

          <div className="space-y-8 md:space-y-16">
            {/* 2019 - Foundation */}
            <div className="relative flex items-center">
              {/* Mobile layout */}
              <div className="md:hidden w-full pl-16">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      2019 - Foundation
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    Capital Pay was founded to bridge the gap in digital
                    financial access, starting with a focus on African markets.
                  </p>
                </div>
              </div>

              {/* Desktop layout - Left side content */}
              <div className="hidden md:block w-1/2 pr-8 text-right">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      2019 - Foundation
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Capital Pay was founded to bridge the gap in digital
                    financial access, starting with a focus on African markets.
                  </p>
                </div>
              </div>

              {/* Center dot - positioned differently for mobile vs desktop */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-2 md:border-4 border-white/20 z-10"></div>

              {/* Desktop - Right side empty */}
              <div className="hidden md:block w-1/2 pl-8"></div>
            </div>

            {/* 2021 - Launch */}
            <div className="relative flex items-center">
              {/* Mobile layout */}
              <div className="md:hidden w-full pl-16">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      2021 - Launch
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    Launched banking integrations for last-mile merchant
                    cash-outs, significantly enhancing financial accessibility.
                  </p>
                </div>
              </div>

              {/* Desktop - Left side empty */}
              <div className="hidden md:block w-1/2 pr-8"></div>

              {/* Center dot - positioned differently for mobile vs desktop */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-2 md:border-4 border-white/20 z-10"></div>

              {/* Desktop - Right side content */}
              <div className="hidden md:block w-1/2 pl-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      2021 - Launch
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Launched banking integrations for last-mile merchant
                    cash-outs, significantly enhancing financial accessibility.
                  </p>
                </div>
              </div>
            </div>

            {/* 2022 - Expansion */}
            <div className="relative flex items-center">
              {/* Mobile layout */}
              <div className="md:hidden w-full pl-16">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      2022 - Expansion
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    Expanded into government services, specializing in customs
                    integrations to optimize government revenues, with
                    integrations for over 21 banks into the Capital Pay
                    platform.
                  </p>
                </div>
              </div>

              {/* Desktop - Left side content */}
              <div className="hidden md:block w-1/2 pr-8 text-right">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      2022 - Expansion
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Expanded into government services, specializing in customs
                    integrations to optimize government revenues, with
                    integrations for over 21 banks into the Capital Pay
                    platform.
                  </p>
                </div>
              </div>

              {/* Center dot - positioned differently for mobile vs desktop */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-2 md:border-4 border-white/20 z-10"></div>

              {/* Desktop - Right side empty */}
              <div className="hidden md:block w-1/2 pl-8"></div>
            </div>

            {/* 2025 - Global Reach */}
            <div className="relative flex items-center">
              {/* Mobile layout */}
              <div className="md:hidden w-full pl-16">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      2025 - Global Reach
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    Extended operations into Asia, Europe, and other markets,
                    offering payment wallets, A2A transfers, and cross-border
                    solutions worldwide.
                  </p>
                </div>
              </div>

              {/* Desktop - Left side empty */}
              <div className="hidden md:block w-1/2 pr-8"></div>

              {/* Center dot - positioned differently for mobile vs desktop */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-2 md:border-4 border-white/20 z-10"></div>

              {/* Desktop - Right side content */}
              <div className="hidden md:block w-1/2 pl-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      2025 - Global Reach
                    </h3>
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
      </div>
    </section>
  );
};

export default Timeline;
