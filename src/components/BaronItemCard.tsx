import { Button } from "@/components/ui/button";
import baronImage from "@/assets/baron-sandwich.png";

interface BaronItemCardProps {
  onConfirm: () => void;
}

const BaronItemCard = ({ onConfirm }: BaronItemCardProps) => {
  return (
    <article className="w-full max-w-sm mx-auto mt-2 rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
      {/* Image */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={baronImage}
          alt="The Baron roast beef sandwich"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">The Baron (Roast Beef)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No horseradish mayo • Side of pickles
            </p>
          </div>
          <span className="text-sm font-medium">$20.40</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Pickup later today at 1:00 pm
        </p>

        {/* Review */}
        <div className="mt-3 pt-3 border-t border-border space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sandwich</span>
            <span>$19.95</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Side of pickles</span>
            <span>+ $0.45</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>$20.40</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Estimated tax (NYC 8.875%)
            </span>
            <span>$1.81</span>
          </div>
          <div className="flex justify-between border-t border-border pt-1 mt-1">
            <span className="font-medium">Total</span>
            <span className="font-medium">$22.21</span>
          </div>
        </div>

        <Button onClick={onConfirm} className="mt-4 w-full">
          Confirm sandwich
        </Button>
      </div>
    </article>
  );
};

export default BaronItemCard;
