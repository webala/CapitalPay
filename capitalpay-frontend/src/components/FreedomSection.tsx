import { Card } from "@/components/ui/card";
import iPhone from "@/assets/iPhone.png";
import linkBank from "@/assets/linkBank.png";
import moneyTransfer from "@/assets/moneyTransfer.png";
import wallet from "@/assets/wallet.png";
import airtime from "@/assets/airtime.png";

const FreedomSection = () => {
  return (
    <section
      id="business"
      className="relative py-20 bg-gradient-to-b from-background to-secondary/20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Second radial gradient (pink/purple tones) - Top Right */}
        <div
          className="absolute top-0 right-1/4 w-[900px] h-[700px] blur-3xl opacity-70"
          style={{
            background: `radial-gradient(circle, #EF07C9 0%, #C54DF3 40%, #A186EB 70%, transparent 100%)`,
          }}
        />
        {/* Additional gradient orbs for more depth */}
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] blur-2xl opacity-30"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl capitalize lg:text-4xl font-bold text-foreground mb-6">
            Empowering businesses of all sizes
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            CapitalPay mobile money services make it easy and safe <br />
            for you to transact from anywhere, anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-6 items-start mx-auto">
          {/* Left - Features */}

          <Card className="px-4 bg-[#002C62] max-h-[250px] border-none py-8 hover:shadow-glow-primary/20 h-full w-full transition-all duration-300 rounded-3xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={moneyTransfer} alt="money-transfer" />
              <div>
                <h3 className="text-base font-medium text-foreground mb-2">
                  BULK AND PAYROLL PAYMENTS
                </h3>
                <p className="text-muted-foreground">
                  Secure, real-time mass disbursements that reduce costs for
                  corporates and institutions.
                </p>
              </div>
            </div>
          </Card>
          <Card className="px-4 bg-gradient-to-br border-none overflow-hidden p-3 pt-6 md:max-h-[300px] from-[#892887] via-[#E94258] to-[#F27224] h-full w-full border-border/50 hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-center overflow-y-hidden gap-3">
              <div className="h-1/3 flex flex-col items-center">
                <h3 className="text-base font-medium text-foreground">
                  CAPITAL PAY WALLET
                </h3>
                <p className="text-muted-foreground">
                  Transform any smartphone into a contactless payment terminal
                  supporting Visa/Mastercard, Apple Pay, Google Pay, and Samsung
                  Pay.
                </p>
              </div>
              <img
                src={iPhone}
                alt="iPhone"
                className="w-full overflow-hidden h-2/3"
              />
            </div>
          </Card>
          <Card className="px-4 bg-[#002C62] max-h-[250px]  py-8 border-none hover:shadow-glow-primary/20 h-full w-full transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={wallet} alt="wallet" />
              <div>
                <h3 className="text-base font-medium text-foreground">
                  ENJOY MULTI-CURRENCY WALLETS
                </h3>
                <p className="text-muted-foreground">
                  Experience a multi-currency wallet, support for NGN, USD, GBP,
                  EUR and many more!
                </p>
              </div>
            </div>
          </Card>

          <Card className="px-4 bg-[#002C62] max-h-[300px] h-full w-full py-8 border-none hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={airtime} alt="airtime" />
              <div>
                <h3 className="text-base font-medium text-foreground">
                  AIRTIME TOP-UP
                </h3>
                <p className="text-muted-foreground">
                  Top-up airtime directly from capital pay mobile money to your
                  phone or to those you hold dear in a quick and simple way
                </p>
              </div>
            </div>
          </Card>
          <Card className="px-4 bg-[#002C62] max-h-[250px] h-full w-full py-8 border-none hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={airtime} alt="airtime" />
              <div>
                <h3 className="text-base font-medium text-foreground">
                  CUSTOMS INTEGRATIONS
                </h3>
                <p className="text-muted-foreground">
                  Enterprise-grade solutions adaptable to e-commerce, fintech,
                  and public infrastructure systems.
                </p>
              </div>
            </div>
          </Card>
          <Card className="px-4 bg-[#002C62] max-h-[300px] h-full py-8 w-full border-none hover:shadow-glow-primary/20 transition-all duration-300 rounded-2xl">
            <div className="flex flex-col items-start space-y-4">
              <img src={linkBank} alt="link-bank" />
              <div>
                <h3 className="text-base font-medium text-foreground">
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
