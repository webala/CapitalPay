import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactUs = () => {
  const faqData = [
    {
      id: "item-1", 
      question: "What is CapitalPay?",
      answer: "CapitalPay is a modern financial technology platform that provides secure money transfer services, digital payments, and financial management tools for both businesses and individuals."
    },
    {
      id: "item-2",
      question: "How do I create an account?",
      answer: "Creating an account is simple - just download our mobile app or visit our website, click 'Sign Up', and follow the verification process. You'll need to provide some basic information and valid ID to get started."
    },
    {
      id: "item-3",
      question: "What are the fees for using CapitalPay?",
      answer: "Our fee structure is transparent and competitive. Basic transfers between CapitalPay accounts are free. International transfers and currency exchanges have small fees that are clearly displayed before you confirm any transaction."
    },
    {
      id: "item-4",
      question: "Is CapitalPay secure?",
      answer: "Yes, security is our top priority. We use bank-level encryption, multi-factor authentication, and regular security audits to protect your data and money. All transactions are monitored 24/7 for suspicious activity."
    },
    {
      id: "item-5",
      question: "What countries does CapitalPay operate in?",
      answer: "CapitalPay currently operates in most major markets across North America, Europe, and Asia. We're continuously expanding our service area - check our website for the most up-to-date list of supported countries."
    }
  ];

  return (
    <div className="min-h-screen relative">
      
      <Header />

      {/* Contact Us Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Form */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Get in touch
              </h1>

              {/* Contact Form */}
              <form className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      NAME
                    </label>
                    <Input
                      type="text"
                      className="bg-blue-800/30 rounded-2xl border-blue-600/50 text-white placeholder:text-white/60 focus:border-blue-400"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      EMAIL
                    </label>
                    <Input
                      type="email"
                      className="bg-blue-800/30 border-blue-600/50 rounded-2xl text-white placeholder:text-white/60 focus:border-blue-400"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Company and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      COMPANY
                    </label>
                    <Input
                      type="text"
                      className="bg-blue-800/30 border-blue-600/50 rounded-2xl text-white placeholder:text-white/60 focus:border-blue-400"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      SUBJECT
                    </label>
                    <Input
                      type="text"
                      className="bg-blue-800/30 border-blue-600/50 rounded-2xl text-white placeholder:text-white/60 focus:border-blue-400"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    MESSAGE
                  </label>
                  <Textarea
                    className="bg-blue-800/30 border-blue-600/50 rounded-2xl text-white placeholder:text-white/60 focus:border-blue-400 min-h-[120px] resize-none"
                    placeholder="Your Message"
                  />
                </div>

                {/* Submit Button */}
                <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold">
                  SEND MESSAGE
                </Button>
              </form>
            </div>

            {/* Right Side - Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Want to reach us directly?
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
                pharetra elementum sit ut sagittis non lorem venenatis.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span className="text-white">contact@example.com</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span className="text-white">support@example.com</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span className="text-white">press@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-transparent to-blue-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            FAQ
          </h2>

          {/* FAQ Accordion */}
          <Accordion
            type="single"
            collapsible
            defaultValue="item-2"
            className="space-y-4"
          >
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className=" rounded-2xl px-6 data-[state=open]:pb-2"
              >
                <AccordionTrigger className="text-left hover:no-underline  rounded-xl px-0 py-6 text-lg font-semibold text-white [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                {faq.answer && (
                  <AccordionContent className="pb-6 pt-0">
                    <div className=" pt-4">
                      <p className="text-white/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
