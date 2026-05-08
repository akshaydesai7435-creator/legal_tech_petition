"use client";

import { use, useState } from "react";
import { petitions } from "@/data/mock";
import { PaymentModal } from "@/components/shared/PaymentModal";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Scale, Clock, ShieldCheck, FileText, IndianRupee, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function PetitionDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const petition = petitions.find(p => p.id === resolvedParams.id) || petitions[0];
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/petitions" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Petitions
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary" className="glass">{petition.category}</Badge>
              {petition.urgency === "Critical" && <Badge variant="destructive">Critical Priority</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{petition.title}</h1>
            
            <div className="rounded-2xl overflow-hidden mb-8 h-[400px]">
              <img src={petition.coverImage} alt={petition.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-semibold mb-4">About the Petition</h3>
              <p className="text-muted-foreground leading-relaxed">
                {petition.description} 
                <br/><br/>
                We are calling upon the local government to take immediate action. The situation has been escalating over the past few months, and without intervention, irreversible damage will occur. 
                <br/><br/>
                Your signature and support will provide us with the legal standing required to file a Public Interest Litigation (PIL) in the High Court.
              </p>
            </div>
          </motion.div>

          <Separator className="bg-white/10" />

          {/* AI Insights Panel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold m-0">AI Legal Insights</h3>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-4">
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><Scale className="w-4 h-4"/> Success Prob.</div>
                  <div className="text-2xl font-bold text-primary">{petition.estimatedSuccess}%</div>
                </div>
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><Clock className="w-4 h-4"/> Est. Timeline</div>
                  <div className="text-xl font-bold text-foreground">{petition.estimatedTime}</div>
                </div>
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><IndianRupee className="w-4 h-4"/> Est. Legal Cost</div>
                  <div className="text-xl font-bold text-foreground">{petition.estimatedCost}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Sticky Sidebar */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glass-card border-white/10 shadow-2xl shadow-primary/5">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-1">{petition.supporters.toLocaleString('en-IN')}</h2>
                    <p className="text-muted-foreground">Signatures collected of {petition.goal.toLocaleString('en-IN')} goal</p>
                    <Progress value={(petition.supporters / petition.goal) * 100} className="h-3 mt-4 bg-primary/20" />
                  </div>
                  
                  <div className="space-y-4">
                    <Button size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90">
                      Sign this Petition
                    </Button>
                    <Button size="lg" variant="outline" className="w-full text-lg h-14 glass" onClick={() => setIsPaymentModalOpen(true)}>
                      Donate to Legal Fund
                    </Button>
                  </div>
                  
                  <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <p>This petition has been verified by our legal team for authenticity and legal standing.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommended Lawyer Snippet */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="glass-card border-white/10">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Top AI Lawyer Match</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="Lawyer" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold">Adv. Sarah Jenkins</h4>
                      <p className="text-xs text-primary">98% Match for this case</p>
                    </div>
                  </div>
                  <Link href="/lawyers" className="w-full">
                    <Button variant="secondary" className="w-full h-10">
                      Consult Lawyer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <PaymentModal open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen} />
    </div>
  );
}
