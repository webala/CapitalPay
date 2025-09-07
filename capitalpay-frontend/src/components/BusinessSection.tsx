import { Card } from "@/components/ui/card";
import { Clock, CreditCard, Repeat } from "lucide-react";
import phones from "@/assets/phones.png";
import receivePayments from "@/assets/receivePayments.png";
import bulkPayments from "@/assets/bulkPayments.png";
import processSalaries from "@/assets/processSalaries.png";

const BusinessSection = () => {
  const features = [
    {
      icon: <CreditCard className="w-6 h-6 text-accent" />,
      image: receivePayments,
      title: "Global reach",
      description:
        "Operate seamlessly across our core markets in Africa, Asia, the UK, and beyond.",
    },
    {
      icon: <Repeat className="w-6 h-6 text-accent" />,
      image: bulkPayments,
      title: "Efficiency",
      description:
        "Save time and reduce costs with our streamlined digital processes..",
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      image: processSalaries,
      title: "Security ",
      description:
        " Trusted, encrypted systems to protect your transactions and data.",
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      image: bulkPayments,
      title: "Dedicated Support ",
      description:
        " Our business support teams are here to help you grow and succeed..",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-secondary/20 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-8 md:px-0 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Phone Mockup */}

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                The CapitalPay Advantage               
              </h2>
              <p className="text-base text-muted-foreground max-w-xl">
                We provide tools that simplify transactions, improve efficiency,
                and build trust.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="py-6 bg-transparent border-none hover:shadow-glow-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img src={feature.image} alt={feature.title} />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              <img
                src={phones}
                alt="CapitalPay Business Features"
                className="w-80 md:w-96 h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              {/* Floating Business Icons */}
              {/* <div className="absolute -top-6 -right-6 bg-gradient-to-r from-accent to-accent/80 rounded-xl p-3 shadow-glow-accent animate-float">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-3 shadow-glow-primary animate-bounce">
                <CreditCard className="w-6 h-6 text-primary-foreground" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Add floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BusinessSection;
