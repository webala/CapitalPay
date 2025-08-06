import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "HOME", href: "#" },
    { name: "ABOUT US", href: "/about" },
    { name: "BUSINESS", href: "#" },
    { name: "PERSONAL", href: "#" },
    { name: "BLOG", href: "#" },
    { name: "CONTACT US", href: "#" },
  ];

  return (
    <header className="w-full bg-transparent relative z-50 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="CapitalPay" className="h-8 w-auto" />
            <p className="font-bold">CapitalPay</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="cta" size="default" className="rounded-3xl">
              DOWNLOAD APP
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="cta"
                size="default"
                className="mt-4 w-full rounded-2xl"
              >
                DOWNLOAD APP
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
