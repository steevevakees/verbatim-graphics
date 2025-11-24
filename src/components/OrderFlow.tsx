import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ReasoningBubble from "./ReasoningBubble";
import BaronItemCard from "./BaronItemCard";
import LocationTimeCard from "./LocationTimeCard";
import ConfirmationCard from "./ConfirmationCard";
import baronImage from "@/assets/baron-sandwich.png";
import storefrontImage from "@/assets/counter-service-storefront.png";
import counterServiceLogo from "@/assets/counter-service-logo.png";

type FlowStep = "reasoning" | "reasoning1b" | "reasoning1c" | "reasoning1d" | "initial" | "confirmed" | "reasoning2" | "placed";

const OrderFlow = () => {
  const [step, setStep] = useState<FlowStep>("reasoning");
  const [orderTime, setOrderTime] = useState("");
  const [isNearBottom, setIsNearBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check if user is near bottom of scroll
  const checkIfNearBottom = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const threshold = 100; // pixels from bottom
      const isNear = scrollHeight - scrollTop - clientHeight < threshold;
      setIsNearBottom(isNear);
    }
  };

  // Auto-scroll to bottom when step changes, but only if user is near bottom
  useEffect(() => {
    if (isNearBottom && scrollRef.current) {
      const scrollToBottom = () => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        });
      };

      // Delay scroll slightly to allow content to render
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [step, isNearBottom]);

  // Simulate multi-step reasoning delays
  useEffect(() => {
    if (step === "reasoning") {
      const timer = setTimeout(() => {
        setStep("reasoning1b");
      }, 1500);
      return () => clearTimeout(timer);
    } else if (step === "reasoning1b") {
      const timer = setTimeout(() => {
        setStep("reasoning1c");
      }, 1500);
      return () => clearTimeout(timer);
    } else if (step === "reasoning1c") {
      const timer = setTimeout(() => {
        setStep("reasoning1d");
      }, 1500);
      return () => clearTimeout(timer);
    } else if (step === "reasoning1d") {
      const timer = setTimeout(() => {
        setStep("initial");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleConfirm = () => {
    setStep("reasoning2");
    setTimeout(() => {
      setStep("confirmed");
    }, 1200);
  };

  const handlePlaceOrder = (time: string) => {
    setOrderTime(time);
    setStep("placed");
  };

  const handleDone = () => {
    console.log("Order flow complete");
  };

  return (
    <div 
      ref={scrollRef} 
      className="h-full overflow-y-auto px-4 py-6 pb-8"
      onScroll={checkIfNearBottom}
    >
      {/* User Message */}
      <MessageBubble
        role="user"
        content="Order The Baron for pickup later today at 1 PM. No horseradish mayo and add a side of pickles?"
      />

      {/* Multi-step Reasoning State */}
      {step === "reasoning" && (
        <ReasoningBubble text="Using Counter Service" logo={counterServiceLogo} />
      )}
      {step === "reasoning1b" && (
        <>
          <ReasoningBubble text="Using Counter Service" logo={counterServiceLogo} />
          <ReasoningBubble text="Pulling up the menu" />
        </>
      )}
      {step === "reasoning1c" && (
        <>
          <ReasoningBubble text="Using Counter Service" logo={counterServiceLogo} />
          <ReasoningBubble text="Pulling up the menu" />
          <ReasoningBubble text="Making adjustments" />
        </>
      )}
      {(step === "reasoning1d" || step === "initial" || step === "reasoning2" || step === "confirmed" || step === "placed") && (
        <>
          <ReasoningBubble text="Using Counter Service" logo={counterServiceLogo} />
          <ReasoningBubble text="Pulling up the menu" />
          <ReasoningBubble text="Making adjustments" />
          <ReasoningBubble text="Adding pickles to the side" />
        </>
      )}

      {/* Initial Assistant Response + Item Card */}
      {(step === "initial" || step === "reasoning2" || step === "confirmed" || step === "placed") && (
        <>
          <MessageBubble
            role="assistant"
            content="Got it. One **Baron** for later today at 1 pm with no horseradish mayo and a side of pickles. Check the order below and confirm if everything looks right."
          />
          {step === "initial" ? (
            <BaronItemCard onConfirm={handleConfirm} />
          ) : (
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

      {/* Second Reasoning State */}
      {step === "reasoning2" && (
        <ReasoningBubble text="Finding nearby locations" />
      )}

      {/* After Confirmation - Location Card */}
      {(step === "confirmed" || step === "placed") && (
        <>
          <MessageBubble
            role="assistant"
            content="Great, I have your **Baron** set the way you like it. Based on your location, you are closest to **Counter Service 14th St** at **54 W 14th St**. Choose a pickup time for today."
          />
          {step === "confirmed" ? (
            <LocationTimeCard onPlaceOrder={handlePlaceOrder} />
          ) : (
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
      {step === "placed" && (
        <>
          <ConfirmationCard time={orderTime} onDone={handleDone} />
          <MessageBubble
            role="assistant"
            content="Confirmed. Your **Baron** will be ready for pickup at 1 pm at **Counter Service 14th St**, **54 W 14th St**. Total is $22.21 with tax."
          />
        </>
      )}
    </div>
  );
};

export default OrderFlow;
