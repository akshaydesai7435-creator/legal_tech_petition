"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useStore } from "@/store/useStore";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleAiWidget = useStore((state) => state.toggleAiWidget);

  const navLinks = [
    { name: "Explore", href: "/petitions" },
    { name: "Lawyers", href: "/lawyers" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 dark:border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                Justice<span className="text-primary">Start</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 border-l border-border pl-4">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {/* Theme icon logic (simplified for stub) */}
                <span className="sr-only">Toggle theme</span>
                <span className="text-xl">🌓</span>
              </Button>
              <Button variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10" onClick={toggleAiWidget}>
                <Sparkles className="w-4 h-4 text-primary" /> AI Assistant
              </Button>
              <Button>Start Petition</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass absolute top-16 w-full border-b border-border shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 pt-4 border-t border-border flex flex-col gap-3">
                <Button className="w-full justify-center gap-2" variant="outline" onClick={() => { toggleAiWidget(); setMobileMenuOpen(false); }}>
                  <Sparkles className="w-4 h-4 text-primary" /> AI Assistant
                </Button>
                <Button className="w-full justify-center">Start Petition</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
