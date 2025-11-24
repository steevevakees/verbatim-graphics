import { Loader2 } from "lucide-react";

interface ReasoningBubbleProps {
  text: string;
}

const ReasoningBubble = ({ text }: ReasoningBubbleProps) => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="max-w-[85%] rounded-[20px] px-4 py-3 bg-muted/50 border border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default ReasoningBubble;
