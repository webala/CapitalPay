import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-secondary to-background py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={logo} alt="CapitalPay" className="h-12 w-auto" />
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Presenting a new opportunity. Sign up to be a CapitalPay user today.
            </h2>
            <p className="text-muted-foreground">
              Experience freedom with unlimited transactions, unlimited all over the world. Register for free.
            </p>
            <Button variant="cta" size="lg">
              GET STARTED TODAY
            </Button>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2024 CapitalPay. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;