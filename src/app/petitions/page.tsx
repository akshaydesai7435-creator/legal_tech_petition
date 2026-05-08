"use client";

import { useStore } from "@/store/useStore";
import { petitions, categories } from "@/data/mock";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function PetitionsPage() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();

  const filteredPetitions = petitions.filter(p => 
    (selectedCategory === "All" || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Petitions</h1>
          <p className="text-muted-foreground">Discover and support causes that matter to you.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by keyword, AI semantics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-primary/20 focus-visible:ring-primary/50 glass bg-background/50"
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 glass">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-10">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 ${selectedCategory !== category ? 'glass' : ''}`}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Petition Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPetitions.map((petition, idx) => (
          <motion.div
            key={petition.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-white/10 glass-card">
              <div className="h-48 overflow-hidden relative">
                <img src={petition.coverImage} alt={petition.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-background/80 backdrop-blur-md text-foreground">
                    {petition.category}
                  </Badge>
                  {petition.urgency === "Critical" && (
                    <Badge variant="destructive" className="animate-pulse">Critical</Badge>
                  )}
                </div>
                {/* AI Score Badge */}
                <div className="absolute bottom-3 right-3 flex gap-1">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground backdrop-blur-md gap-1">
                    <Sparkles className="w-3 h-3" /> {petition.aiRelevanceScore}% Match
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-5">
                <h3 className="font-bold text-lg line-clamp-2 leading-tight mb-2 hover:text-primary transition-colors">
                  <Link href={`/petitions/${petition.id}`}>{petition.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{petition.description}</p>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-primary">{petition.supporters.toLocaleString()} supporters</span>
                    <span className="text-muted-foreground">{Math.round((petition.supporters / petition.goal) * 100)}% of goal</span>
                  </div>
                  <Progress value={(petition.supporters / petition.goal) * 100} className="h-2 bg-primary/20" />
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link href={`/petitions/${petition.id}`} className="w-full">
                  <Button className="w-full glass" variant="outline">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {filteredPetitions.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No petitions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
