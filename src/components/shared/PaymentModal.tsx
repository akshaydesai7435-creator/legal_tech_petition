"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("50");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-white/10">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Support the Cause</DialogTitle>
                <DialogDescription>
                  Your contribution helps fund the legal battle for this petition.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex gap-3">
                  {["10", "25", "50", "100"].map((val) => (
                    <Button
                      key={val}
                      type="button"
                      variant={amount === val ? "default" : "outline"}
                      className={`flex-1 ${amount !== val ? 'glass' : ''}`}
                      onClick={() => setAmount(val)}
                    >
                      ${val}
                    </Button>
                  ))}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="custom-amount">Custom Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7 glass"
                    />
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Card Details (Mock Stripe)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="4242 4242 4242 4242" className="pl-9 glass" />
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="MM/YY" className="glass" />
                    <Input placeholder="CVC" className="glass" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Payments are secure and encrypted.
              </div>

              <DialogFooter>
                <Button className="w-full h-12 text-lg relative overflow-hidden" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? (
                    <span className="flex items-center gap-2">Processing...</span>
                  ) : (
                    <span>Donate ${amount}</span>
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center">Thank You!</DialogTitle>
              <p className="text-muted-foreground">Your contribution of ${amount} has been successfully processed.</p>
              <Button className="mt-8 glass" variant="outline" onClick={handleClose}>
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
