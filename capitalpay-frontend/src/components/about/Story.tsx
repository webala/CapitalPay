
const Story = () => {
  return (
    <section className="pb-20 px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Our story</h2>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque lorem purus justo, ultrices. Sollicitudin odio
                elementum urna placerat lacus, volutpate. Non malesuada viverra
                et ultricies orci. Tincidunt tempor, blandit augue ac feugiat.
                Praesent arcu tempus ullamcorper quisque in. Magna fermentum,
                lacus fermentum arcu.
              </p>
              <p>
                Vulputate pellentesque proin facilibus dignissim gravida sed
                faucibus nunc. Nunc amet pharetra, in vitae porta lacus. Elit in
                nisl in quis nulla tellus suscipit id. Semper velit odio orci
                pretium tristique habitant. Elit eu porttitor congue orci
                turpis.
              </p>
            </div>
          </div>

          {/* Right Content - Placeholder for additional visual */}
          <div className="flex justify-center">
            {/* This space can be used for another visual element if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story