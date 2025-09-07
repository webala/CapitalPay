import planetImg from "@/assets/planet.png";

const Mission = () => {
  return (
    <section className="pt-10 px-8 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          From Africa to the World
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Our story</h2>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Capital Pay began with a vision to close the gap in financial
                access, starting in Africa and expanding worldwide. From
                simplifying mobile money and bill payments to enabling
                cross-border trade, payroll, and e-commerce solutions, we've
                grown into a trusted partner for individuals, businesses, and
                governments.
              </p>
              <p>
                Our journey is guided by one goal: to create a world where money
                moves easily, transparently, and without borders. Today, Capital
                Pay International has evolved into a global fintech powerhouse,
                with operations spanning across Kenya, Uganda, Tanzania,
                Mozambique, Zimbabwe, South Sudan, Philippines, UAE, Mauritius,
                Angola, and UK.
              </p>
            </div>
          </div>

          {/* Right Content - Planet Image */}
          <div className="flex justify-center lg:translate-y-48">
            <img
              src={planetImg}
              alt="Global Network"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission