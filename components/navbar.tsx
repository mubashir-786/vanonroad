"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Models", href: "#models" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-slate-900/95" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className={cn(
              "text-2xl font-playfair font-bold tracking-tight transition-colors",
              scrolled ? "text-slate-900 dark:text-white" : "text-white"
            )}>
              VAN <span className="text-amber-500"> ON ROAD</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium hover:text-amber-500 transition-colors",
                  scrolled ? "text-slate-700 dark:text-slate-200" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-md">
              <Phone className="mr-2 h-4 w-4" /> Call Us
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              scrolled ? "text-slate-900 dark:text-white" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full transition-all duration-300 ease-in-out overflow-hidden bg-white dark:bg-slate-900 shadow-lg",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col space-y-4 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-700 dark:text-white font-medium hover:text-amber-500"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-md w-full">
            <Phone className="mr-2 h-4 w-4" /> Call Us
          </Button>
        </nav>
      </div>
    </header>
  );
}