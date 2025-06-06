"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, Info, Truck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getInventoryItems, InventoryItem } from "@/lib/api/inventory";
import Link from "next/link";

export function FeaturedModels() {
  const [featuredItems, setFeaturedItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedModels();
  }, []);

  const loadFeaturedModels = async () => {
    try {
      setLoading(true);
      // Remove the status filter to avoid the composite index requirement
      const { items } = await getInventoryItems({}, 6);
      // Filter for available items on the client side
      const availableItems = items.filter(item => item.status === 'available');
      setFeaturedItems(availableItems.slice(0, 6));
    } catch (error) {
      console.error('Error loading featured models:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="models\" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-amber-500">Models</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Discover our range of luxury motorhomes designed to provide the ultimate in comfort,
              style and functionality for your adventures.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="models" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-amber-500">Models</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            Discover our range of luxury motorhomes designed to provide the ultimate in comfort,
            style and functionality for your adventures.
          </p>
        </div>

        {featuredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No models available at the moment. Please check back later.
            </p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link href="/inventory">
            <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white">
              View All Models <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ModelCard({ model }: { model: InventoryItem }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        {model.images && model.images.length > 0 ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ 
              backgroundImage: `url(${model.images[0]})`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-slate-500">No Image</span>
          </div>
        )}
        
        {model.year >= new Date().getFullYear() && (
          <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-500">New Model</Badge>
        )}
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{model.title}</h3>
            <p className="text-amber-600 font-semibold">£{model.price.toLocaleString()}</p>
          </div>
          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
            <Info className="h-4 w-4" />
          </Button>
        </div>
        
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex items-start">
            <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-amber-500" />
            {model.berths} berths
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-amber-500" />
            {model.make} {model.model}
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-amber-500" />
            {model.year} model
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-amber-500" />
            {model.location}
          </li>
        </ul>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        <Link href={`/inventory/${model.id}`} className="w-full">
          <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}