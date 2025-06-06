"use client";

import { SearchInventory } from "@/components/search-inventory";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const heroImages = [
  "https://images.pexels.com/photos/2769583/pexels-photo-2769583.jpeg",
  "https://images.pexels.com/photos/2506711/pexels-photo-2506711.jpeg",
  "https://images.pexels.com/photos/9433031/pexels-photo-9433031.jpeg"
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 bg-cover bg-center",
            currentImage === index ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />

      {/* Content */}
      <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-3xl pt-32 pb-8">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Luxury Motorhomes <span className="text-amber-400">Built For You</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl">
            Discover our range of bespoke motorhomes, crafted with the finest materials
            and attention to detail, providing the ultimate in luxury travel experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/inventory">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-md">
                View Our Inventory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:text-slate-900 hover:bg-white/90 rounded-md">
                Book a Showroom Visit
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Inventory */}
        <div className="mt-8 mb-16">
          <SearchInventory />
        </div>

        {/* Slider Indicators */}
        <div className="flex space-x-2 absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-12 h-1 rounded-full transition-all",
                currentImage === index ? "bg-amber-500" : "bg-white/40 hover:bg-white/60"
              )}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}