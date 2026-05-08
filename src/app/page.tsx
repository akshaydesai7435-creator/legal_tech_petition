"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Users, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import { petitions } from "@/data/mock";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function LandingPage() {
  const stats = [
    { label: "Active Petitions", value: "2,450+", icon: FileText },
    { label: "Lawyers Onboarded", value: "850+", icon: Scale },
    { label: "Cases Resolved", value: "1,200+", icon: CheckCircle },
    { label: "Supporters", value: "150k+", icon: Users },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 py-1 px-3 border-primary/30 text-primary bg-primary/5 glass">
              AI-Powered Legal Assistance
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Justice Starts <span className="text-gradient">Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
              The next-generation civic action platform. Start petitions, connect with top-tier lawyers, and leverage AI to navigate the legal system.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/petitions/new">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                  Start a Petition <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/petitions">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full glass hover:bg-white/5">
                  Explore Petitions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Particles/Elements Simulation */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 bg-primary/10 rounded-2xl text-primary mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Petitions */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Petitions</h2>
            <p className="text-muted-foreground">Join thousands making a difference today.</p>
          </div>
          <Link href="/petitions" className="hidden sm:flex">
            <Button variant="ghost">
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {petitions.slice(0, 3).map((petition, idx) => (
            <motion.div
              key={petition.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border-white/10 glass-card">
                <div className="h-48 overflow-hidden relative">
                  <img src={petition.coverImage} alt={petition.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                  <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-md text-foreground">
                    {petition.category}
                  </Badge>
                </div>
                <CardHeader className="p-5">
                  <h3 className="font-bold text-lg line-clamp-2 leading-tight mb-2">{petition.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{petition.description}</p>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-end">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-primary">{petition.supporters.toLocaleString('en-IN')} supporters</span>
                      <span className="text-muted-foreground">Goal: {petition.goal.toLocaleString('en-IN')}</span>
                    </div>
                    <Progress value={(petition.supporters / petition.goal) * 100} className="h-2 bg-primary/20" />
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Link href={`/petitions/${petition.id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Sign Petition
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
