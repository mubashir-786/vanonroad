"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function InventoryFilters() {
  const [priceRange, setPriceRange] = useState([50000, 200000]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label>Search</Label>
          <Input type="text" placeholder="Search motorhomes..." />
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-4">
          <Label>Price Range</Label>
          <Slider
            defaultValue={[50000, 200000]}
            max={500000}
            min={0}
            step={5000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
          />
          <div className="flex items-center justify-between text-sm">
            <span>£{priceRange[0].toLocaleString()}</span>
            <span>£{priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        {/* Type */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="luxury">Luxury Collection</SelectItem>
              <SelectItem value="compact">Compact Range</SelectItem>
              <SelectItem value="custom">Custom Build</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Make */}
        <div className="space-y-2">
          <Label>Make</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
              <SelectItem value="fiat">Fiat</SelectItem>
              <SelectItem value="volkswagen">Volkswagen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Berths */}
        <div className="space-y-2">
          <Label>Berths</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select berths" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Berths</SelectItem>
              <SelectItem value="2">2 Berths</SelectItem>
              <SelectItem value="4">4 Berths</SelectItem>
              <SelectItem value="6">6 Berths</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label>Year</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Year</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <Button className="w-full bg-amber-500 hover:bg-amber-600">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}