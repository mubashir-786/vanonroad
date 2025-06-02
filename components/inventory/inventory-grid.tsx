"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Maximize, Info } from "lucide-react";
import { useState } from "react";

const inventory = [
  {
    id: 1,
    title: "2024 Signature Series Luxury",
    price: "£195,000",
    location: "Yorkshire",
    image: "https://images.pexels.com/photos/2506711/pexels-photo-2506711.jpeg",
    berths: 6,
    length: "8.5m",
    make: "Mercedes-Benz",
    model: "Signature",
    year: 2024,
    mileage: "New",
    new: true,
  },
  {
    id: 2,
    title: "2023 Elite Range Explorer",
    price: "£175,000",
    location: "London",
    image: "https://images.pexels.com/photos/2769583/pexels-photo-2769583.jpeg",
    berths: 4,
    length: "7.8m",
    make: "Fiat",
    model: "Elite",
    year: 2023,
    mileage: "1,200 miles",
  },
  {
    id: 3,
    title: "2024 Urban Explorer Plus",
    price: "£120,000",
    location: "Manchester",
    image: "https://images.pexels.com/photos/2918521/pexels-photo-2918521.jpeg",
    berths: 2,
    length: "6.4m",
    make: "Volkswagen",
    model: "Urban",
    year: 2024,
    mileage: "New",
    new: true,
  },
  {
    id: 4,
    title: "2023 Voyager Deluxe",
    price: "£155,000",
    location: "Scotland",
    image: "https://images.pexels.com/photos/2897148/pexels-photo-2897148.jpeg",
    berths: 4,
    length: "7.2m",
    make: "Mercedes-Benz",
    model: "Voyager",
    year: 2023,
    mileage: "2,500 miles",
  },
  {
    id: 5,
    title: "2024 City Cruiser Premium",
    price: "£105,000",
    location: "Birmingham",
    image: "https://images.pexels.com/photos/7598347/pexels-photo-7598347.jpeg",
    berths: 2,
    length: "5.9m",
    make: "Fiat",
    model: "City",
    year: 2024,
    mileage: "New",
    new: true,
  },
  {
    id: 6,
    title: "2023 Weekend Escape Plus",
    price: "£95,000",
    location: "Bristol",
    image: "https://images.pexels.com/photos/2967768/pexels-photo-2967768.jpeg",
    berths: 2,
    length: "5.5m",
    make: "Volkswagen",
    model: "Weekend",
    year: 2023,
    mileage: "3,800 miles",
  },
];

export function InventoryGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventory.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden transition-all duration-300 h-full flex flex-col"
          onMouseEnter={() => setHoveredCard(item.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${item.image})`,
                transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)",
              }}
            />
            {item.new && (
              <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-500">
                New Arrival
              </Badge>
            )}
            <div className="absolute bottom-4 left-4 flex items-center text-white bg-slate-900/80 px-3 py-1 rounded">
              <Maximize className="mr-1 h-4 w-4" />
              <span className="text-sm">{item.length}</span>
            </div>
          </div>

          <CardContent className="flex-grow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold font-playfair">{item.title}</h3>
                <p className="text-amber-600 font-semibold">{item.price}</p>
              </div>
              <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Info className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Make:</span>
                <span className="font-medium">{item.make}</span>
              </div>
              <div className="flex justify-between">
                <span>Berths:</span>
                <span className="font-medium">{item.berths}</span>
              </div>
              <div className="flex justify-between">
                <span>Year:</span>
                <span className="font-medium">{item.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Mileage:</span>
                <span className="font-medium">{item.mileage}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium">{item.location}</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-900 text-white">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}