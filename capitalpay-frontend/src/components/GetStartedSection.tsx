import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, UserPlus, Smartphone } from "lucide-react";
import downloadApp from "@/assets/downloadApp.png";
import createFreeAccount from "@/assets/createFreeAccount.png";
import startTransacting from "@/assets/startTransacting.png";

const GetStartedSection = () => {
  const steps = [
    {
      icon: <Download className="w-8 h-8 text-accent" />,
      title: "Download app",
      step: "01",
      image: downloadApp,
    },
    {
      icon: <UserPlus className="w-8 h-8 text-accent" />,
      title: "Create a free account",
      step: "02",
      image: createFreeAccount,
    },
    {
      icon: <Smartphone className="w-8 h-8 text-accent" />,
      title: "Start transacting",
      step: "03",
      image: startTransacting,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-secondary/30 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />

      <div className="relative container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Get started today
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience faster and smarter transactions, advanced payroll and
                many more amazing services today.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6 ">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className=" bg-gradient-card border-none transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img src={step.image} alt={step.title} />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right - Video Placeholder */}
          <div className="relative">
            <Card className="aspect-video bg-blue-900 rounded-2xl border-none flex items-center justify-center group hover:shadow-glow-primary/20 transition-all duration-300">
              <Button
                variant="ghost"
                size="lg"
                className="w-20 h-20 rounded-full bg-accent/20 hover:bg-accent/30 hover:scale-110 transition-all duration-300"
              >
                <svg
                  className="w-8 h-8 text-accent ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </Card>
            <p className="text-center text-muted-foreground mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, do
              exercitation exercitation sed do magna commodo. Lorem elit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
