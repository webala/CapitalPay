import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "JOHN CASTLE",
      role: "USER • 5 YEARS",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique mauris tempor lacus lobortis, at pellentesque lectus molestie. Nulla sed arcu sed est placerat facilisis eget dapibus lorem."
    },
    {
      name: "SARAH JOHNSON", 
      role: "USER • 3 YEARS",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique mauris tempor lacus lobortis, at pellentesque lectus molestie. Nulla sed arcu sed est placerat facilisis eget dapibus lorem."
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-secondary/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What our users say?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 bg-gradient-card border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === 0 ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;