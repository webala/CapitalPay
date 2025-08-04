import { Button } from "@/components/ui/button";
import groupIPhones from "@/assets/groupIPhones.png";

const ExploreSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-[#892887] via-[#E94258] to-[#F27224]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#892887]/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-[#F27224]/30 to-transparent" />

      <div className="relative container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Explore endless possibilities
              <br />
              with <span className="text-accent">CapitalPay</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl">
              Limitless freedom with unlimited transactions, unlimited all over
              the world. Experience endless possibilities now.
            </p>

            <Button variant="cta" size="lg">
              DOWNLOAD APP
            </Button>
          </div>

          {/* Right - Phone Collection */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={groupIPhones}
                alt="CapitalPay Features"
                className="w-full max-w-lg h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              {/* Decorative Elements */}
              {/* <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full opacity-60 animate-ping" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-full opacity-40 animate-pulse" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
