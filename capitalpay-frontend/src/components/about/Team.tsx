import team1Img from "@/assets/team1.png";
import team2Img from "@/assets/team2.png";
import team3Img from "@/assets/team3.png";

const Team = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          {/* Left Content */}
          <div className="w-full">
            <h2 className="text-4xl font-bold text-white mb-6">Our Team</h2>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque lorem purus justo, ultrices.
            </p>
          </div>

          {/* Right Content - Team Grid */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* John Carter */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-blue-400 border-dashed p-1">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                    <img
                      src={team1Img}
                      alt="John Carter"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">
                        JOHN CARTER
                      </h3>
                      <p className="text-blue-400 text-sm">CEO & CO-FOUNDER</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sophie Moore */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-blue-400 border-dashed p-1">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                    <img
                      src={team2Img}
                      alt="Sophie Moore"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">
                        SOPHIE MOORE
                      </h3>
                      <p className="text-white/80 text-sm">COMMUNITY LEAD</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alex Turner */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-blue-400 border-dashed p-1">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                    <img
                      src={team3Img}
                      alt="Alex Turner"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">
                        ALEX TURNER
                      </h3>
                      <p className="text-blue-400 text-sm">OPERATIONS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team