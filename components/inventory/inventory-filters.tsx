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
import { useState, useEffect } from "react";
import { InventoryFilters as IInventoryFilters } from "@/lib/api/inventory";
import { getMakes, Make } from "@/lib/api/makes";

interface InventoryFiltersProps {
  onFiltersChange: (filters: IInventoryFilters) => void;
  initialFilters?: IInventoryFilters;
}

export function InventoryFilters({ onFiltersChange, initialFilters = {} }: InventoryFiltersProps) {
  const [priceRange, setPriceRange] = useState([
    initialFilters.minPrice || 50000, 
    initialFilters.maxPrice || 200000
  ]);
  const [filters, setFilters] = useState<IInventoryFilters>(initialFilters);
  const [makes, setMakes] = useState<Make[]>([]);
  const [makesLoading, setMakesLoading] = useState(true);

  // Load makes
  useEffect(() => {
    loadMakes();
  }, []);

  // Update filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
    setPriceRange([
      initialFilters.minPrice || 50000,
      initialFilters.maxPrice || 200000
    ]);
  }, [initialFilters]);

  const loadMakes = async () => {
    try {
      setMakesLoading(true);
      const makesList = await getMakes();
      setMakes(makesList);
    } catch (error) {
      console.error('Error loading makes:', error);
    } finally {
      setMakesLoading(false);
    }
  };

  const handleFilterChange = (key: keyof IInventoryFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    const newFilters = { 
      ...filters, 
      minPrice: values[0], 
      maxPrice: values[1] 
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    setPriceRange([50000, 200000]);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label>Search</Label>
          <Input 
            type="text" 
            placeholder="Search motorhomes..." 
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
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
            onValueChange={handlePriceRangeChange}
            className="mt-2"
          />
          <div className="flex items-center justify-between text-sm">
            <span>£{priceRange[0].toLocaleString()}</span>
            <span>£{priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        {/* Make */}
        <div className="space-y-2">
          <Label>Make</Label>
          <Select 
            value={filters.make || 'all'} 
            onValueChange={(value) => handleFilterChange('make', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {makesLoading ? (
                <SelectItem value="loading-makes" disabled>Loading makes...</SelectItem>
              ) : (
                makes.map((make) => (
                  <SelectItem key={make.id} value={make.name}>
                    {make.displayName}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Berths */}
        <div className="space-y-2">
          <Label>Berths</Label>
          <Select 
            value={filters.berths?.toString() || 'all'} 
            onValueChange={(value) => handleFilterChange('berths', value === 'all' ? undefined : parseInt(value))}
          >
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

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select 
            value={filters.status || 'all'} 
            onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}