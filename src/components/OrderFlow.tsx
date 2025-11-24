import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ReasoningBubble from "./ReasoningBubble";
import BaronItemCard from "./BaronItemCard";
import LocationTimeCard from "./LocationTimeCard";
import ConfirmationCard from "./ConfirmationCard";

type FlowStep = "reasoning" | "initial" | "confirmed" | "reasoning2" | "placed";

const OrderFlow = () => {
  const [step, setStep] = useState<FlowStep>("reasoning");
  const [orderTime, setOrderTime] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when step changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step]);

  // Simulate reasoning delay
  useEffect(() => {
    if (step === "reasoning") {
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
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
      {/* User Message */}
      <MessageBubble
        role="user"
        content="Order The Baron for pickup later today at 1 PM. No horseradish mayo and add a side of pickles?"
      />

      {/* Reasoning State */}
      {step === "reasoning" && (
        <ReasoningBubble text="Using Counter Service" />
      )}

      {/* Initial Assistant Response + Item Card */}
      {(step === "initial" || step === "reasoning2" || step === "confirmed" || step === "placed") && (
        <>
          <MessageBubble
            role="assistant"
            content="Got it. One Baron for later today at 1 pm with no horseradish mayo and a side of pickles. Check the order below and confirm if everything looks right."
          />
          <BaronItemCard onConfirm={handleConfirm} />
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
            content="Great, I have your Baron set the way you like it. Based on your location, you are closest to Counter Service 14th St at 54 W 14th St. Choose a pickup time for today."
          />
          <LocationTimeCard onPlaceOrder={handlePlaceOrder} />
        </>
      )}

      {/* After Placing Order - Confirmation */}
      {step === "placed" && (
        <>
          <ConfirmationCard time={orderTime} onDone={handleDone} />
          <MessageBubble
            role="assistant"
            content="Confirmed. Your Baron will be ready for pickup at 1 pm at Counter Service 14th St, 54 W 14th St. Total is about twenty two dollars and twenty one cents with tax."
          />
        </>
      )}
    </div>
  );
};

export default OrderFlow;
