import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FreedomSection from "@/components/FreedomSection";
import BusinessSection from "@/components/BusinessSection";
import Story from "@/components/about/Story";
import Timeline from "@/components/about/Timeline";
import Mission from "@/components/about/Mission";
import Features from "@/components/home/Features";
import InsightsSection from "@/components/InsightsSection";
import GetInTouch from "@/components/home/GetInTouch";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Full Background Gradient Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background */}
        <div className="absolute inset-0"></div>

        {/* First radial gradient (blue tones) - Top Left */}
        <div
          className="absolute top-0 left-0 w-[800px] h-[600px] blur-3xl opacity-80"
          style={{
            background: `radial-gradient(circle, #C4FFF1 0%, #3B82F6 30%, #1D4ED8 60%, transparent 100%)`,
          }}
        />

        {/* Second radial gradient (pink/purple tones) - Top Right */}
        <div
          className="absolute top-0 right-0 w-[900px] h-[700px] blur-3xl opacity-70"
          style={{
            background: `radial-gradient(circle, #EF07C9 0%, #C54DF3 40%, #A186EB 70%, transparent 100%)`,
          }}
        />

        {/* Additional gradient orbs for more depth */}
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] blur-2xl opacity-30"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
          }}
        />

        <div
          className="absolute top-1/2 right-1/3 w-[350px] h-[350px] blur-2xl opacity-25"
          style={{
            background: `radial-gradient(circle, #C54DF3 0%, transparent 70%)`,
          }}
        />
      </div>
      <Header />
      <HeroSection />
      <Mission />
      <Story />
      <Features />
      <Timeline />
      <FreedomSection />
      <BusinessSection />
      <InsightsSection />
      <GetInTouch />
      {/* <ExploreSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <GetStartedSection /> */}
      {/* <NewsSection /> */}
      {/* <VirtualCardApplication /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
