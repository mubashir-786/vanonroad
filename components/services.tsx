"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Truck, PaintBucket, Wrench, RefreshCw, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "custom",
    icon: <Settings className="h-12 w-12 mb-4 text-amber-500" />,
    title: "Bespoke Design",
    description: "Work with our design team to create your perfect motorhome, tailored to your specific requirements and taste."
  },
  {
    id: "build",
    icon: <Truck className="h-12 w-12 mb-4 text-amber-500" />,
    title: "Custom Builds",
    description: "From chassis to completion, we build your motorhome with precision, using the highest quality materials."
  },
  {
    id: "paint",
    icon: <PaintBucket className="h-12 w-12 mb-4 text-amber-500" />,
    title: "Paint & Finishing",
    description: "Professional paint finishing in any color scheme, with optional graphics and branding."
  },
  {
    id: "service",
    icon: <Wrench className="h-12 w-12 mb-4 text-amber-500" />,
    title: "Servicing & Repairs",
    description: "Regular maintenance and repairs carried out by our experienced technicians to keep your motorhome in perfect condition."
  },
  {
    id: "refurbish",
    icon: <RefreshCw className="h-12 w-12 mb-4 text-amber-500" />,
    title: "Refurbishments",
    description: "Transform your existing motorhome with our comprehensive refurbishment services."
  },
  {
    id: "warranty",
    icon: <Shield className="h-12 w-12 mb-4 text-amber-500" />,
    title: "Warranty & Support",
    description: "Peace of mind with our comprehensive warranty packages and ongoing customer support."
  },
];

export function Services() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services\" className="py-24 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            Our <span className="text-amber-500">Services</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            From design and build to aftercare, we provide a complete range of services
            to ensure your motorhome experience is perfect in every way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className={cn(
                "border-0 overflow-hidden transition-all duration-300 bg-white dark:bg-slate-800",
                hoveredCard === service.id ? "shadow-lg translate-y-[-5px]" : "shadow"
              )}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8 text-center">
                {service.icon}
                <h3 className="text-xl font-bold mb-3 font-playfair">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{service.description}</p>
                
                <div className={cn(
                  "mt-6 inline-block text-amber-500 font-medium transition-all duration-300",
                  hoveredCard === service.id ? "text-amber-600 translate-x-1" : ""
                )}>
                  Learn more →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}