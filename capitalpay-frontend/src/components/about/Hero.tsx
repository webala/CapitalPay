
const Hero = () => {
  return (
    <section className="py-20 px-8">
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          About CapitalPay
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla
          suspendisse tortor aenean dis placerat. Scelerisque imperdiet vitae
          dolor non aliquam. Maecenas.
        </p>

        {/* What drives CapitalPay Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-left">
            What drives CapitalPay?
          </h2>
          <p className="text-white/80 text-left mb-12 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendise tortor aenean.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Open Source Card */}
          <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8 text-left">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">OPEN SOURCE</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh
              urna in proin dui purus bibendum cras. Morbi cursus nunc.
            </p>
          </div>

          {/* Worldwide Card */}
          <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8 text-left">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">WORLDWIDE</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh
              urna in proin dui purus bibendum cras. Morbi cursus nunc.
            </p>
          </div>

          {/* Transparent Card */}
          <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8 text-left">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">TRANSPARENT</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh
              urna in proin dui purus bibendum cras. Morbi cursus nunc.
            </p>
          </div>

          {/* Community Driven Card */}
          <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8 text-left">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 18H20zm-8.5 0v-7.5L9.87 8.66C9.24 7.84 8.29 7.5 7.5 7.5H4c-.8 0-1.54.37-2 1L.5 12H3l1.87-2.5L6 18h5.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">
                COMMUNITY DRIVEN
              </h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh
              urna in proin dui purus bibendum cras. Morbi cursus nunc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero