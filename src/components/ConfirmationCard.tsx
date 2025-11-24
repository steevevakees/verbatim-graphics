import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ConfirmationCardProps {
  time: string;
  onDone: () => void;
}

const ConfirmationCard = ({ time, onDone }: ConfirmationCardProps) => {
  return (
    <article className="w-full max-w-sm mx-auto mt-2 rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold">Order placed</h2>
        </div>

        <div className="space-y-1 text-sm">
          <p className="font-medium">The Baron (Roast Beef)</p>
          <p className="text-muted-foreground">Pickup today at {time.toLowerCase()}</p>
          <p className="text-muted-foreground">
            Counter Service 14th St · 54 W 14th St
          </p>
          <p className="text-muted-foreground">Total $22.21</p>
        </div>

        <Button onClick={onDone} variant="secondary" className="mt-2 w-full">
          Done
        </Button>
      </div>
    </article>
  );
};

export default ConfirmationCard;
