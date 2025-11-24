import { Loader2, Check } from "lucide-react";

interface ReasoningBubbleProps {
  text: string;
  logo?: string;
  completed?: boolean;
  fadeOut?: boolean;
}

const ReasoningBubble = ({ text, logo, completed = false, fadeOut = false }: ReasoningBubbleProps) => {
  return (
    <div className={`flex w-full mb-2 justify-start transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="rounded-[20px] px-4 py-2.5 bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          {logo ? (
            <img src={logo} alt="App logo" className="w-4 h-4 rounded-full" />
          ) : completed ? (
            <div className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
              <Check className="w-3 h-3 text-background" />
            </div>
          ) : (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default ReasoningBubble;
