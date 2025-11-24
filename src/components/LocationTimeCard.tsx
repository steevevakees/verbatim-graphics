import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import storefrontImage from "@/assets/counter-service-storefront.png";
import { cn } from "@/lib/utils";

interface LocationTimeCardProps {
  onPlaceOrder: (time: string) => void;
}

const LocationTimeCard = ({ onPlaceOrder }: LocationTimeCardProps) => {
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const times = ["1:00 PM", "1:15 PM", "1:30 PM"];

  return (
    <div className="w-full max-w-sm mx-auto mt-2">
      <article className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
        {/* Storefront image */}
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={storefrontImage}
            alt="Counter Service 14th St storefront"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Counter Service 14th St</h2>
            <Badge className="bg-emerald-500 text-white border-0 hover:bg-emerald-600">
              Open now
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            54 W 14th St · Near Union Square
          </p>
          <p className="text-xs text-muted-foreground">Pickup today</p>
        </div>
      </article>

      {/* Time chips + recap + CTA */}
      <div className="mt-3">
        <div className="flex gap-2">
          {times.map((time) => {
            const selected = time === selectedTime;
            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "flex-1 px-3 py-1.5 rounded-full text-sm transition-colors",
                  selected
                    ? "bg-card border border-border shadow-sm font-medium"
                    : "bg-muted border border-border text-muted-foreground"
                )}
              >
                {time}
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          The Baron · No horseradish mayo · Side of pickles · Total $22.21
        </p>

        <Button
          onClick={() => onPlaceOrder(selectedTime)}
          className="mt-3 w-full"
        >
          Place order for {selectedTime.toLowerCase()}
        </Button>
      </div>
    </div>
  );
};

export default LocationTimeCard;
