import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/about/Hero";
import Mission from "@/components/about/Mission";
import Story from "@/components/about/Story";
import Timeline from "@/components/about/Timeline";
import Team from "@/components/about/Team";
import Partners from "@/components/about/Partners";

const About = () => {
  return (
    <div className="min-h-screen relative">
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

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* About CapitalPay Hero Section */}
        <Hero />
      </div>

      {/* Our Mission Section */}
      <Mission />

      {/* Our Story Section */}
      <Story />

      {/* Timeline Section */}
      <Timeline />

      {/* Our Team Section */}
      <Team />

      {/* Partners Section */}
      <Partners />

      <Footer />
    </div>
  );
};

export default About;
