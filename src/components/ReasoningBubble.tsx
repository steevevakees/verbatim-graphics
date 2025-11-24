import { Loader2 } from "lucide-react";

interface ReasoningBubbleProps {
  text: string;
  detail?: string;
}

const ReasoningBubble = ({ text, detail }: ReasoningBubbleProps) => {
  return (
    <div className="flex w-full mb-3 justify-start animate-fade-in">
      <div className="max-w-[85%] rounded-[20px] px-4 py-2.5 bg-muted/50 border border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{text}</span>
            {detail && <span className="text-xs">{detail}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningBubble;
