import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 pt-32 pb-20 max-w-7xl ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-[#C6F1F7] via-[#F983E9] via-[#B877FF] to-[#C2E9CD] bg-clip-text text-transparent">
              We turn your <span className="text-primary">digital</span>
              <br />
              dreams into <span className="text-accent">reality</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              It is a smart and intuitive app that will simplify your financial
              lives and meet your ever-evolving financial needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="cta" size="lg" className="rounded-3xl">
                DOWNLOAD APP
              </Button>
              <Button variant="hero" size="lg" className="rounded-3xl">
                VIEW PRICING
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={hero}
                alt="CapitalPay Mobile App"
                className="w-80 md:w-96 h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -right-4 bg-accent rounded-full p-2 shadow-glow-accent animate-bounce">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-accent-foreground"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary rounded-full p-3 shadow-glow-primary animate-pulse">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary-foreground"
                >
                  <path
                    d="M9 11H15M12 8V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
