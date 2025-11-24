import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Plus, Mic, ArrowUp, User, Settings } from "lucide-react";
import { useState } from "react";
import OrderFlow from "./OrderFlow";

const ChatInterface = () => {
  const [message, setMessage] = useState("Order The Baron for pickup later today at 1 PM. No horseradish mayo and add a side of pickles?");
  const [hasStarted, setHasStarted] = useState(false);

  const handleSend = () => {
    if (message.trim() && !hasStarted) {
      setHasStarted(true);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background safe-top safe-bottom">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border safe-top">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500" />
            <span className="font-medium text-foreground">ChatGPT</span>
            <span className="text-sm text-muted-foreground">5.1</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden">
        {hasStarted ? (
          <OrderFlow />
        ) : (
          <div className="h-full flex items-center justify-center px-4">
            <h1 className="text-3xl font-normal text-foreground">
              Good to see you, Steeve.
            </h1>
          </div>
        )}
      </main>

      {/* Bottom Input Area */}
      <div className="border-t border-border bg-background safe-bottom">
        <div className="max-w-3xl mx-auto px-4 py-4 pb-6">
          <div className="relative flex items-center gap-2 bg-background border border-border rounded-[26px] px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 hover:bg-accent"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 hover:bg-accent"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSend}
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full bg-foreground hover:bg-foreground/90 text-background"
              disabled={!message.trim()}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
