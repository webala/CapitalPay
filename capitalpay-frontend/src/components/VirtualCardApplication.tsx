import cards from "@/assets/cards.png";
import iPhoneGroup from "@/assets/iPhoneGroup.png";
import { Button } from "./ui/button";
const VirtualCardApplication = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-start py-10 md:py-20">
      <h2 className="text-3xl md:text-4xl text-center lg:text-5xl font-bold text-foreground my-10">
        Apply for a virtual card
      </h2>
      <div className="flex gap-10 items-center justify-center w-full">
        <img src={cards} alt="cards" className="h-[410px] w-[510px]" />
        <img src={iPhoneGroup} alt="iPhoneGroup" className="h-[410px] hidden md:block" />
      </div>
      <Button className="w-1/2 md:w-[400px] rounded-2xl mt-10">Apply now</Button>
    </div>
  );
};

export default VirtualCardApplication;
