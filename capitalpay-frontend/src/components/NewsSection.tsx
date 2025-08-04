import { Card } from "@/components/ui/card";

const NewsSection = () => {
  const newsItems = [
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      title: "The Future of Digital Banking",
      excerpt: "Discover how CapitalPay is revolutionizing the financial industry with cutting-edge technology."
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", 
      title: "Security in Mobile Payments",
      excerpt: "Learn about our advanced security measures that protect your financial transactions."
    },
    {
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      title: "Global Expansion Update",
      excerpt: "CapitalPay announces expansion to new markets, bringing financial freedom worldwide."
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-secondary/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Browse our latest news
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, do exercitation exercitation sed do magna commodo. Lorem amet
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-card border-border/50 hover:shadow-glow-primary/20 transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.excerpt}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;