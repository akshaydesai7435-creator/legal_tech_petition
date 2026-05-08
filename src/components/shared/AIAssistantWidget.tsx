"use client";

import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, Bot } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

export function AIAssistantWidget() {
  const { aiWidgetOpen, toggleAiWidget } = useStore();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your legal AI assistant. How can I help you today? I can help you draft a petition, estimate legal costs, or find a lawyer.", sender: "ai" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI Response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        text: "I can certainly help with that. Are you looking to start a new petition or do you need a legal notice draft?", 
        sender: "ai" 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {aiWidgetOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] z-50 flex flex-col glass-card rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/50 to-indigo-900/50">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Legal AI Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleAiWidget} className="h-8 w-8 rounded-full hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.sender === 'ai' && (
                    <Avatar className="w-8 h-8 flex items-center justify-center bg-primary/20 border border-primary/30">
                      <Bot className="w-4 h-4 text-primary" />
                    </Avatar>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-muted rounded-tl-sm border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-background/50">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask a legal question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="bg-muted/50 border-white/10 focus-visible:ring-primary/50 rounded-full"
              />
              <Button size="icon" onClick={handleSend} className="rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
