"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Check if it's an anchor link
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate to home first then scroll
      if (pathname !== '/') {
        router.push(`/${href}`);
      } else {
        // If we're on home page, just scroll to the section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "/inventory" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-slate-900/95" : "bg-white/95 shadow-md backdrop-blur-sm dark:bg-slate-900/95"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Made bigger */}
          <Link href="/" className="flex items-center">
            <div className="w-40 h-16 relative">
              <Image
                src="/van_on_road_logo.svg"
                alt="Van On Road"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.href.startsWith('#') ? (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-medium text-slate-900 dark:text-slate-100 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="font-medium text-slate-900 dark:text-slate-100 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md transition-colors text-slate-900 dark:text-slate-100"
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
            <div key={link.name}>
              {link.href.startsWith('#') ? (
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-slate-900 dark:text-slate-100 font-medium hover:text-amber-500 text-left"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="text-slate-900 dark:text-slate-100 font-medium hover:text-amber-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}