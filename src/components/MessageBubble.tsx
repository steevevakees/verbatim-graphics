import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-[20px] px-4 py-3 text-[15px] leading-[22px]",
          role === "user"
            ? "bg-foreground text-background"
            : "bg-muted text-foreground"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;
