import { useState } from "react";
import MessageBubble from "./MessageBubble";
import BaronItemCard from "./BaronItemCard";
import LocationTimeCard from "./LocationTimeCard";
import ConfirmationCard from "./ConfirmationCard";

type FlowStep = "initial" | "confirmed" | "placed";

const OrderFlow = () => {
  const [step, setStep] = useState<FlowStep>("initial");
  const [orderTime, setOrderTime] = useState("");

  const handleConfirm = () => {
    setStep("confirmed");
  };

  const handlePlaceOrder = (time: string) => {
    setOrderTime(time);
    setStep("placed");
  };

  const handleDone = () => {
    // Could reset or close
    console.log("Order flow complete");
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {/* User Message */}
      <MessageBubble
        role="user"
        content="Order The Baron for pickup later today at 1 PM. No horseradish mayo and add a side of pickles?"
      />

      {/* Initial Assistant Response + Item Card */}
      <MessageBubble
        role="assistant"
        content="Got it. One Baron for later today at 1 pm with no horseradish mayo and a side of pickles. Check the order below and confirm if everything looks right."
      />
      
      {step === "initial" && <BaronItemCard onConfirm={handleConfirm} />}

      {/* After Confirmation */}
      {step === "confirmed" && (
        <>
          <MessageBubble
            role="assistant"
            content="Great, I have your Baron set the way you like it. Based on your location, you are closest to Counter Service 14th St at 54 W 14th St. Choose a pickup time for today."
          />
          <LocationTimeCard onPlaceOrder={handlePlaceOrder} />
        </>
      )}

      {/* After Placing Order */}
      {step === "placed" && (
        <>
          <MessageBubble
            role="assistant"
            content="Great, I have your Baron set the way you like it. Based on your location, you are closest to Counter Service 14th St at 54 W 14th St. Choose a pickup time for today."
          />
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
