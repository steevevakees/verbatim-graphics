import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ReasoningBubble from "./ReasoningBubble";
import BaronItemCard from "./BaronItemCard";
import LocationTimeCard from "./LocationTimeCard";
import ConfirmationCard from "./ConfirmationCard";
import baronImage from "@/assets/baron-sandwich.png";
import storefrontImage from "@/assets/counter-service-storefront.png";

type FlowStep = 
  | "reasoning-menu" 
  | "reasoning-order" 
  | "initial" 
  | "typewriter1"
  | "confirmed" 
  | "reasoning-location" 
  | "typewriter2"
  | "placed"
  | "typewriter3";

const OrderFlow = () => {
  const [step, setStep] = useState<FlowStep>("reasoning-menu");
  const [orderTime, setOrderTime] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth auto-scroll to bottom when step changes
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
  }, [step]);

  // Multi-stage reasoning simulation
  useEffect(() => {
    if (step === "reasoning-menu") {
      const timer = setTimeout(() => {
        setStep("reasoning-order");
      }, 1200);
      return () => clearTimeout(timer);
    } else if (step === "reasoning-order") {
      const timer = setTimeout(() => {
        setStep("typewriter1");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleTypewriter1Complete = () => {
    setStep("initial");
  };

  const handleConfirm = () => {
    setStep("reasoning-location");
    setTimeout(() => {
      setStep("typewriter2");
    }, 1400);
  };

  const handleTypewriter2Complete = () => {
    setStep("confirmed");
  };

  const handlePlaceOrder = (time: string) => {
    setOrderTime(time);
    setStep("typewriter3");
  };

  const handleTypewriter3Complete = () => {
    setStep("placed");
  };

  const handleDone = () => {
    console.log("Order flow complete");
  };

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      {/* User Message */}
      <MessageBubble
        role="user"
        content="Order The Baron for pickup later today at 1 PM. No horseradish mayo and add a side of pickles?"
      />

      {/* Multi-stage Reasoning */}
      {step === "reasoning-menu" && (
        <ReasoningBubble 
          text="Using Counter Service" 
          detail="Looking up menu items"
        />
      )}

      {(step === "reasoning-order" || step === "typewriter1" || step === "initial" || 
        step === "reasoning-location" || step === "typewriter2" || step === "confirmed" || 
        step === "typewriter3" || step === "placed") && (
        <ReasoningBubble 
          text="Using Counter Service" 
          detail="Looking up menu items"
        />
      )}

      {(step === "reasoning-order" || step === "typewriter1" || step === "initial" || 
        step === "reasoning-location" || step === "typewriter2" || step === "confirmed" || 
        step === "typewriter3" || step === "placed") && (
        <ReasoningBubble 
          text="Using Counter Service" 
          detail="Building your customized Baron sandwich"
        />
      )}

      {/* First Assistant Response + Item Card */}
      {(step === "typewriter1" || step === "initial" || step === "reasoning-location" || 
        step === "typewriter2" || step === "confirmed" || step === "typewriter3" || step === "placed") && (
        <>
          <MessageBubble
            role="assistant"
            content="Got it. One Baron for later today at 1 pm with no horseradish mayo and a side of pickles. Check the order below and confirm if everything looks right."
            useTypewriter={step === "typewriter1"}
            onTypewriterComplete={handleTypewriter1Complete}
          />
          {step === "initial" && <BaronItemCard onConfirm={handleConfirm} />}
          
          {(step === "reasoning-location" || step === "typewriter2" || step === "confirmed" || 
            step === "typewriter3" || step === "placed") && (
            <div className="w-full max-w-sm mx-auto mt-2 rounded-2xl border border-border bg-card shadow-lg overflow-hidden opacity-60">
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={baronImage}
                  alt="The Baron roast beef sandwich"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">The Baron (Roast Beef)</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      No horseradish mayo • Side of pickles
                    </p>
                  </div>
                  <span className="text-sm font-medium">$20.40</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Location Reasoning State */}
      {(step === "reasoning-location" || step === "typewriter2" || step === "confirmed" || 
        step === "typewriter3" || step === "placed") && (
        <ReasoningBubble 
          text="Using Counter Service" 
          detail="Finding nearby Counter Service locations"
        />
      )}

      {/* After Confirmation - Location Card */}
      {(step === "typewriter2" || step === "confirmed" || step === "typewriter3" || step === "placed") && (
        <>
          <MessageBubble
            role="assistant"
            content="Great, I have your Baron set the way you like it. Based on your location, you are closest to Counter Service 14th St at 54 W 14th St. Choose a pickup time for today."
            useTypewriter={step === "typewriter2"}
            onTypewriterComplete={handleTypewriter2Complete}
          />
          {step === "confirmed" && <LocationTimeCard onPlaceOrder={handlePlaceOrder} />}
          
          {(step === "typewriter3" || step === "placed") && (
            <div className="w-full max-w-sm mx-auto mt-2 opacity-60">
              <article className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={storefrontImage}
                    alt="Counter Service 14th St storefront"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">Counter Service 14th St</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    54 W 14th St · Near Union Square
                  </p>
                </div>
              </article>
            </div>
          )}
        </>
      )}

      {/* After Placing Order - Confirmation */}
      {(step === "typewriter3" || step === "placed") && (
        <>
          <MessageBubble
            role="assistant"
            content="Confirmed. Your Baron will be ready for pickup at 1 pm at Counter Service 14th St, 54 W 14th St. Total is about twenty two dollars and twenty one cents with tax."
            useTypewriter={step === "typewriter3"}
            onTypewriterComplete={handleTypewriter3Complete}
          />
        </>
      )}
      
      {step === "placed" && (
        <>
          <ConfirmationCard time={orderTime} onDone={handleDone} />
        </>
      )}
    </div>
  );
};

export default OrderFlow;
