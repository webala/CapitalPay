import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FreedomSection from "@/components/FreedomSection";
import BusinessSection from "@/components/BusinessSection";
import ExploreSection from "@/components/ExploreSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GetStartedSection from "@/components/GetStartedSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FreedomSection />
      <BusinessSection />
      <ExploreSection />
      <TestimonialsSection />
      <GetStartedSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
