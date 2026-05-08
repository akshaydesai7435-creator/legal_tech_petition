"use client";

import { lawyers } from "@/data/mock";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scale, Sparkles, Star, MapPin, Languages, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LawyersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Lawyer Match</h1>
          <p className="text-muted-foreground">Find the perfect legal representation based on case history and AI analysis.</p>
        </div>
        <div className="w-full md:w-96 relative">
          <Input placeholder="Describe your legal issue for AI matching..." className="h-12 pl-4 pr-12 glass rounded-full" />
          <Button size="icon" className="absolute right-1 top-1 h-10 w-10 rounded-full">
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer, idx) => (
          <motion.div
            key={lawyer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col glass-card border-white/10 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                  <img src={lawyer.photo} alt={lawyer.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg leading-none">{lawyer.name}</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                      <Sparkles className="w-3 h-3" /> {lawyer.aiCompatibilityScore}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{lawyer.specialization}</p>
                  <p className="text-xs font-medium text-foreground mt-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {lawyer.winRate}% Win Rate
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 shrink-0" /> {lawyer.experience} Experience
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 shrink-0" /> {lawyer.languages.join(", ")}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-green-500" /> {lawyer.availability}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex items-center justify-between gap-4">
                <div className="text-sm font-bold">
                  {lawyer.consultationFee} <span className="text-xs text-muted-foreground font-normal">/ consult</span>
                </div>
                <Button className="flex-1 bg-primary hover:bg-primary/90">Book Consultation</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
