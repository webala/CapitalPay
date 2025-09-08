import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about", section: "about" },
    { name: "BUSINESS", href: "#business", section: "business" },
    // { name: "PERSONAL", href: "#" },
    { name: "BLOG", href: "#insights", section: "insights" },
    { name: "CONTACT US", href: "/contact", section: "contact" },
  ];

  // Handle smooth scrolling to sections
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    section?: string
  ) => {
    if (href.startsWith("#") && section) {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["about", "business", "insights", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            return;
          }
        }
      }

      // If we're at the top, set to empty (HOME)
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-white/10 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="CapitalPay" className="h-8 w-auto" />
            <p className="font-bold text-white">CapitalPay</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive =
                location.pathname === "/"
                  ? item.section
                    ? activeSection === item.section
                    : activeSection === ""
                  : location.pathname === item.href;

              return item.href.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) =>
                    handleSectionClick(e, item.href, item.section)
                  }
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
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
              {navigation.map((item) => {
                const isActive =
                  location.pathname === "/"
                    ? item.section
                      ? activeSection === item.section
                      : activeSection === ""
                    : location.pathname === item.href;

                return item.href.startsWith("#") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) =>
                      handleSectionClick(e, item.href, item.section)
                    }
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
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
