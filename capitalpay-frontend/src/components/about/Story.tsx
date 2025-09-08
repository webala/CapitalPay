
const Story = () => {
  return (
    <section className="pb-20 px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Our vision</h2>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Our vision is to become the indispensable financial operating
                system for businesses and individuals worldwide. We achieve this
                by creating a unified, intuitive, and cost-effective platform
                that seamlessly integrates point-of-sale payments, domestic
                financial operations, and global commerce.
              </p>
              <p>
                While Capital Pay International is the parent company, we
                operate through a network of specialized entities and
                partnerships in each region to cater to specific market demands.
                This allows us to push different agendas in different
                markets from customs and banking solutions in Tanzania to
                advanced payment aggregation platforms in the UK, all under the
                trusted Capital Pay International umbrella.
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