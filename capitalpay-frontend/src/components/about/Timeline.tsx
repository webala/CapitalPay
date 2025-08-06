import React from "react";

const Timeline = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Timeline</h2>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diem
              libero vitae erat.
            </p>
          </div>

          {/* Right Content - Timeline */}
          <div className="space-y-12">
            {/* 2014 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2014</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    ANNOUNCEMENT
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  mattis vivamus et mattis bibendum congue orci et interdum.
                  Risus leo et.
                </p>
                <div className="mt-4 h-px bg-white/20"></div>
              </div>
            </div>

            {/* 2016 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2016</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    ANNOUNCEMENT
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  mattis vivamus et mattis bibendum congue orci et interdum.
                  Risus leo et.
                </p>
                <div className="mt-4 h-px bg-white/20"></div>
              </div>
            </div>

            {/* 2018 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2018</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    ANNOUNCEMENT
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  mattis vivamus et mattis bibendum congue orci et interdum.
                  Risus leo et.
                </p>
                <div className="mt-4 h-px bg-white/20"></div>
              </div>
            </div>

            {/* 2022 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full mt-1 mr-6"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white mr-4">2022</h3>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    ANNOUNCEMENT
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  mattis vivamus et mattis bibendum congue orci et interdum.
                  Risus leo et.
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
