"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Info, Maximize, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    id: "luxury",
    name: "Luxury Collection",
    vehicles: [
      {
        id: "signature",
        name: "Signature Series",
        price: "£195,000",
        image: "https://images.pexels.com/photos/2506711/pexels-photo-2506711.jpeg",
        features: ["Up to 6 berths", "King-size master bedroom", "Luxury bathroom", "Full kitchen"],
        length: "8.5m",
        new: true
      },
      {
        id: "elite",
        name: "Elite Range",
        price: "£175,000",
        image: "https://images.pexels.com/photos/2769583/pexels-photo-2769583.jpeg",
        features: ["Up to 4 berths", "Queen-size bed", "Premium finishes", "Entertainment system"],
        length: "7.8m"
      },
      {
        id: "voyager",
        name: "Voyager Plus",
        price: "£155,000",
        image: "https://images.pexels.com/photos/2897148/pexels-photo-2897148.jpeg",
        features: ["Up to 4 berths", "Double bed", "Spacious living area", "Modern kitchen"],
        length: "7.2m"
      }
    ]
  },
  {
    id: "compact",
    name: "Compact Range",
    vehicles: [
      {
        id: "urban",
        name: "Urban Explorer",
        price: "£120,000",
        image: "https://images.pexels.com/photos/2918521/pexels-photo-2918521.jpeg",
        features: ["2-3 berths", "Convertible bed", "Compact kitchen", "Easy to drive"],
        length: "6.4m",
        new: true
      },
      {
        id: "city",
        name: "City Cruiser",
        price: "£105,000",
        image: "https://images.pexels.com/photos/7598347/pexels-photo-7598347.jpeg",
        features: ["2 berths", "Space-saving design", "Modern amenities", "Fuel efficient"],
        length: "5.9m"
      },
      {
        id: "weekend",
        name: "Weekend Escape",
        price: "£95,000",
        image: "https://images.pexels.com/photos/2967768/pexels-photo-2967768.jpeg",
        features: ["2 berths", "Compact design", "Essential features", "Perfect for couples"],
        length: "5.5m"
      }
    ]
  }
];

export function FeaturedModels() {
  return (
    <section id="models" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            Explore Our <span className="text-amber-500">Models</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            Discover our range of luxury motorhomes designed to provide the ultimate in comfort,
            style and functionality for your adventures.
          </p>
        </div>

        <Tabs defaultValue="luxury" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
              {models.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {models.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.vehicles.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white">
            View All Models <BookOpen className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ModelCard({ model }: { model: any }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${model.image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        {model.new && (
          <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-500">New Model</Badge>
        )}
        <div className="absolute bottom-4 left-4 flex items-center text-white bg-slate-900/80 px-3 py-1 rounded">
          <Maximize className="mr-1 h-4 w-4" />
          <span className="text-sm">{model.length}</span>
        </div>
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold font-playfair">{model.name}</h3>
            <p className="text-amber-600 font-semibold">{model.price}</p>
          </div>
          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
            <Info className="h-4 w-4" />
          </Button>
        </div>
        
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          {model.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-amber-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}