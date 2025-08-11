import { Card } from "@/components/ui/card";
import iPhone from "@/assets/iphone.png";
import linkBank from "@/assets/linkBank.png";
import moneyTransfer from "@/assets/moneyTransfer.png";
import wallet from "@/assets/wallet.png";
import airtime from "@/assets/airtime.png";

const FreedomSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-secondary/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Your phone, your money, your freedom.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fast and seamless from anywhere, anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 items-center">
          {/* Left - Features */}

          <Card className="px-4 bg-[#002C62] py-16 border-border/50 hover:shadow-glow-primary/20 h-full w-full transition-all duration-300 rounded-3xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={moneyTransfer} alt="money-transfer" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  MOBILE MONEY TRANSFERS
                </h3>
                <p className="text-muted-foreground">
                  Send and receive money from one part of your country to
                  another, or across borders with ease
                </p>
              </div>
            </div>
          </Card>
          <Card className="px-4 bg-gradient-to-br from-[#892887] via-[#E94258] to-[#F27224] h-full w-full pt-10 border-border/50 lg:row-span-2 hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  PAY BILLS
                </h3>
                <p className="text-muted-foreground">
                  Send and receive money from one part of your country to
                  another, or across borders with ease
                </p>
              </div>
              <img src={iPhone} alt="iPhone" className="w-full" />
            </div>
          </Card>
          <Card className="px-4 bg-[#002C62] py-16 border-border/50 hover:shadow-glow-primary/20 h-full w-full transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={wallet} alt="wallet" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  ENJOY MULTI-CURRENCY WALLETS
                </h3>
                <p className="text-muted-foreground">
                  Experience a multi-currency wallet, support for NGN, USD, GBP,
                  EUR and many more!
                </p>
              </div>
            </div>
          </Card>

          <Card className="px-4 bg-[#002C62] h-full w-full py-16 border-border/50 hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={airtime} alt="airtime" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  AIRTIME TOP-UP
                </h3>
                <p className="text-muted-foreground">
                  Top-up airtime directly from capital pay mobile money to your
                  phone or to those you hold dear in a quick and simple way
                </p>
              </div>
            </div>
          </Card>
          <Card className="px-4 bg-[#002C62] py-16 h-full w-full border-border/50 hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={linkBank} alt="link-bank" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  LINK YOUR BANK ACCOUNTS
                </h3>
                <p className="text-muted-foreground">
                  Need to transfer funds between your bank account and your
                  phone? CapitalPay conveniently and securely connects to any
                  bank
                </p>
              </div>
            </div>
          </Card>

          {/* Right - Phone Collection */}
          {/* <div className="relative flex justify-center">
            <img
              src={phoneCollection}
              alt="CapitalPay App Screenshots"
              className="w-full max-w-lg h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FreedomSection;
